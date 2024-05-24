import express from "express";
import { getDocById, updateDocById, sendMailOtp, testFunc } from "../controller/index.js";
import { ensureToken } from "../services/Secure.js";

const router = express.Router();

//send Mail
router.post("/sendMail", sendMailOtp);
router.get("/test",  testFunc);

//get user by id
router.get("/", ensureToken, getDocById);

//update user by id
router.post("/", ensureToken, updateDocById);

export default router;
