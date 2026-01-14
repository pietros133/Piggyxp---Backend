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

export default async function emailRecoveryPassword({ user, code }) {
  if (!user || !user.email || !user.name) return;

  const templatePath = path.join(
    process.cwd(),
    "email-templates",
    "recovery.html"
  );

  let html = fs.readFileSync(templatePath, "utf-8");
  html = html.replace("{{name}}", user.name);
  html = html.replace("{{recovery_code}}", code);

  await transporter.sendMail({
    from: `"PiggyXP" <piggyxp.oficial@gmail.com>`,
    to: user.email,
    subject: "Recuperação de senha",
    html,
  });
}
