import firebase from "../services/Firebase.js";
import { Query } from "../models/index.js";
import { PrivateKey, SortTableData, _tokenDetails } from "../services/index.js";
import jsonwebtoken from "jsonwebtoken";
import smtpPool from "nodemailer-smtp-pool";
import nodemailer from "nodemailer";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

// Set up nodemailer transporter
var transporter = nodemailer.createTransport(
  smtpPool({
    service: "gmail",
    auth: {
      user: "khaszeeshan8@gmail.com",
      pass: "repkyegtppajhpqq",
    },
    maxConnections: 5,
    maxMessages: 10,
  })
);

export const getDocById = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = _tokenDetails(req.token)?.user_id;
    const queryData = await Query?.query_Get_by_id(path[1], id);
    if (queryData.exists()) {
      res.send(queryData?.data());
    } else {
      res.send({ msg: "No user Found", code: "404" });
    }
    res.end();
  } catch (e) {
    console.log("Firebase", e.message);
    res.sendStatus(500);
    res.end();
  }
};

export const updateDocById = async (req, res) => {
  try {
    let path = req.originalUrl?.replace("/", "").split("/");
    let id = _tokenDetails(req.token)?.user_id;
    let data = req.body;
    if (
      Object.keys(data).length === 0 ||
      data?.email ||
      data?.provider ||
      data?.password
    ) {
      res.sendStatus(400);
      return;
    }

    const queryData = await Query?.query_update_by_id(path[1], id, data);
    const queryGetData = await Query?.query_Get_by_id(path[1], id);
    res.send({
      msg: "User updated.",
      code: 200,
      updated_data: queryGetData?.data(),
    });
    res.end();
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    res.end();
  }
};

// Function to generate a random 6-digit code
const generateOTP = () => {
  // Generate a random number between 100000 and 999999
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendMailOtp = async (req, res) => {
  try {
    const { to, mode } = req.body;
    const otp = generateOTP(); // Generate OTP code
    if (!to) {
      res.send({ msg: "Email is required" });
      res.end();
      return;
    }
    // Construct email options
    const mailOptions = {
      from: "khaszeeshan8@gmail.com",
      to: to,
      subject: "Verification Code",
      text: `Here is your otp code: ${otp}`,
    };
    let db = getFirestore();
    const userRef = query(collection(db, "users"), where("email", "==", to));
    const querySnapshot = await getDocs(userRef);
    if (querySnapshot.size > 0 || mode == "register") {
      // Send email
      let pass = null;
      if (querySnapshot?.size > 0) {
        querySnapshot?.forEach((doc) => {
          pass = doc.data()?.pass;
        });
      }
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent:", info.response);
          res.send({
            msg: "Email sent successfully",
            otp: otp,
            code: 200,
            pass: pass,
          });
        }
      });
    } else {
      res.send({ msg: "User Account not found.", code: 404 });
    }
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500);
    res.end();
  }
};
