import express from "express";
import { createBooking } from "../services/booking.service.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await createBooking(req.body);
    console.log(result)
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
