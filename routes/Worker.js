import express from "express";
import { acceptbookings, getWorkerBookings } from "../controllers/booking.js";
import { ChangeStatus} from "../controllers/Customer.js";

const router = express.Router();

router.post("/customers",getWorkerBookings);
router.post("/accept",acceptbookings);
router.put("/status",ChangeStatus);
export default router;