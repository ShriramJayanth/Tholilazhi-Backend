import express from "express";
import { CUSTOMERlogin,CUSTOMERregister} from "../controllers/auth.js";

const router = express.Router();

router.post("/login",CUSTOMERlogin);
router.post("/register",CUSTOMERregister);

export default router;