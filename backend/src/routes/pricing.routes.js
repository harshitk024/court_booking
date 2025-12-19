import express from "express";
import pool from "../db.js";
import { calculatePrice } from "../services/pricing.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    courtId,
    startTime,
    endTime,
    equipment,
    coachSelected
  } = req.body;

  if (!courtId || !startTime || !endTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { rows } = await pool.query(
    "SELECT * FROM courts WHERE id = $1",
    [courtId]
  );

  const court = rows[0];
  if (!court) return res.status(404).json({ error: "Court not found" });

  const pricing = await calculatePrice({
    court,
    startTime: new Date(startTime),
    endTime: new Date(endTime),
    equipment,
    coachSelected
  });

  res.json(pricing);
});

export default router;
