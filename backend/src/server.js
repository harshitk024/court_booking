import express from "express"
import cors from "cors"
import pool from "./db.js"
import availabilityRoutes from "./routes/availability.routes.js"
import pricingRoutes from "./routes/pricing.routes.js"
import bookingRoutes from "./routes/booking.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/availability",availabilityRoutes)
app.use("/pricing",pricingRoutes)
app.use("/booking",bookingRoutes)

app.get("/health",(req,res) => {
    res.json({"status": "OK"})
})

app.get("/courts",async (req,res) => {
    const {rows} = await pool.query(
        "SELECT * FROM courts WHERE is_active = true"
    );
    res.json(rows)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running on PORT: ",PORT)
})