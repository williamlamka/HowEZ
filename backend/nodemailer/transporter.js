import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "williamlamproject@gmail.com", // gmail address
      pass: process.env.NODEMAILER_PASSWORD, // gmail passpowd
    },
  });