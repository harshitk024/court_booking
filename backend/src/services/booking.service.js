import pool from "../db.js";
import { calculatePrice } from "./pricing.service.js";

export async function createBooking(payload) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const {
      courtId,
      coachId,
      startTime,
      endTime,
      equipment = {}, 
    } = payload;

    const courtRes = await client.query(
      `
      SELECT *
      FROM courts
      WHERE id = $1 AND is_active = true
      FOR UPDATE
      `,
      [courtId]
    );

    if (courtRes.rows.length === 0) {
      throw new Error("Court not available");
    }

    const courtConflict = await client.query(
      `
      SELECT 1
      FROM bookings
      WHERE court_id = $1
        AND status = 'CONFIRMED'
        AND start_time < $3
        AND end_time > $2
      `,
      [courtId, startTime, endTime]
    );

    if (courtConflict.rows.length > 0) {
      throw new Error("Court already booked for this slot");
    }


    if (coachId) {
      const coachConflict = await client.query(
        `
        SELECT 1
        FROM bookings
        WHERE coach_id = $1
          AND status = 'CONFIRMED'
          AND start_time < $3
          AND end_time > $2
        `,
        [coachId, startTime, endTime]
      );

      if (coachConflict.rows.length > 0) {
        throw new Error("Coach not available");
      }
    }


    for (const [equipmentId, qty] of Object.entries(equipment)) {
      if (!qty || qty <= 0) continue;

      const eqRes = await client.query(
        `
        SELECT 
          e.id,
          e.total_quantity -
          COALESCE((
            SELECT SUM(be.quantity)
            FROM booking_equipment be
            JOIN bookings b ON b.id = be.booking_id
            WHERE be.equipment_id = e.id
              AND b.status = 'CONFIRMED'
              AND b.start_time < $3
              AND b.end_time > $2
          ), 0) AS available
        FROM equipment e
        WHERE e.id = $1
        FOR UPDATE
        `,
        [equipmentId, startTime, endTime]
      );

      if (eqRes.rows.length === 0) {
        throw new Error("Equipment not found");
      }

      if (eqRes.rows[0].available < qty) {
        throw new Error("Equipment not available");
      }
    }


    const pricing = await calculatePrice({
      court: courtRes.rows[0],
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      equipment, 
      coachSelected: Boolean(coachId),
    });

    const bookingRes = await client.query(
      `
      INSERT INTO bookings
        (court_id, coach_id, start_time, end_time, total_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [courtId, coachId || null, startTime, endTime, pricing.total]
    );

    const bookingId = bookingRes.rows[0].id;

    for (const [equipmentId, qty] of Object.entries(equipment)) {
      if (!qty || qty <= 0) continue;

      await client.query(
        `
        INSERT INTO booking_equipment
          (booking_id, equipment_id, quantity)
        VALUES ($1, $2, $3)
        `,
        [bookingId, equipmentId, qty]
      );
    }

    await client.query("COMMIT");

    return {
      booking: bookingRes.rows[0],
      pricing,
    };

  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
