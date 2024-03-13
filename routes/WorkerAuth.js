import express from "express";
import { WORKERlogin,WORKERregister} from "../controllers/auth.js";

const router = express.Router();

router.post("/login",WORKERlogin);
router.post("/register",WORKERregister);

export default router;