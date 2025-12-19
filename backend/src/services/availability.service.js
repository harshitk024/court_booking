import pool from "../db.js";

export async function getAvailabilityForSlot(start, end) {

  const courtsQuery = `
    SELECT * 
    FROM courts c
    WHERE c.is_active = true
    AND NOT EXISTS (
    SELECT 1
    FROM bookings b
    WHERE b.court_id = c.id
    AND b.status = 'CONFIRMED'
    AND b.start_time < $2
    AND b.end_time > $1
    )
    `;
  
  const coachesQuery = `
  SELECT * 
  FROM coaches c
  WHERE c.is_active = true
  AND NOT EXISTS (
  SELECT 1 
  FROM bookings b
  where b.coach_id = c.id
  AND b.status = 'CONFIRMED'
  AND b.start_time < $2
  AND b.end_time > $1
  )
  AND EXISTS (
  SELECT 1 
  FROM coach_availability ca
  WHERE ca.coach_id = c.id
  AND ca.day = $3
  AND ca.start_time <= ($1 AT TIME ZONE 'Asia/Kolkata')::time
  AND ca.end_time >= ($2 AT TIME ZONE 'Asia/Kolkata')::time
  )
  `

  const equipmentQuery = `
    SELECT e.id, e.name,
           e.total_quantity - COALESCE(SUM(be.quantity), 0) AS available
    FROM equipment e
    LEFT JOIN booking_equipment be ON e.id = be.equipment_id
    LEFT JOIN bookings b ON b.id = be.booking_id
      AND b.status = 'CONFIRMED'
      AND b.start_time < $2
      AND b.end_time > $1
    GROUP BY e.id
    `;

  const date = new Date(start)
  const dayOfWeek = date.getUTCDay()

  const [courts, coaches, equipment] = await Promise.all([
    pool.query(courtsQuery, [start, end]),
    pool.query(coachesQuery,[start,end,dayOfWeek]),
    pool.query(equipmentQuery, [start, end]),
  ]);

  console.log(start);
  console.log(end)

  return {
    courts: courts.rows,
    coaches: coaches.rows,
    equipment: equipment.rows,
  };
}
