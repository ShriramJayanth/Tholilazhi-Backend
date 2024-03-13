import express from "express";
import { getCustomerBookings,DeleteBooking } from "../controllers/booking.js";

const router = express.Router();

router.get("/booking",getCustomerBookings);
router.delete("/booking",DeleteBooking);

export default router;