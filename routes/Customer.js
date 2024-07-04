import express from "express";
import { getCustomerBookings,DeleteBooking,bookWorker } from "../controllers/booking.js";
import { getWorkers } from "../controllers/Customer.js";

const router = express.Router();

router.post("/bookings",getCustomerBookings);
router.post("/deletebooking",DeleteBooking);
router.post("/Workers",getWorkers);
router.put("/book",bookWorker);

export default router;