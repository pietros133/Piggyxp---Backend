import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "piggyxp.oficial@gmail.com",
    pass: process.env.nodemailer_key,
  },
});

export default async function emailWelcome({ user }) {
  if (!user || !user.email || !user.name) return;

  const templatePath = path.join(
    process.cwd(),
    "email-templates",
    "welcome.html"
  );

  let html = fs.readFileSync(templatePath, "utf-8");
  html = html.replace("{{name}}", user.name);

  await transporter.sendMail({
    from: `"PiggyXP" <piggyxp.oficial@gmail.com>`,
    to: user.email,
    subject: "Bem-vindo ao PiggyXP 🐷💰",
    html,
  });
}
