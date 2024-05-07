import express from "express";
import { getDocById, updateDocById,sendMailOtp } from "../controller/index.js";
import { ensureToken } from "../services/Secure.js";

const router = express.Router();

//get user by id
router.get("/", ensureToken, getDocById);

//update user by id
router.post("/", ensureToken, updateDocById);

//send Mail
router.post("/sendMail", sendMailOtp);

export default router;
