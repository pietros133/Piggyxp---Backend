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

const autoemailWelcome = async (req) => {
  try {
    const user = req.user;

    if (!user || !user.email || !user.name) {
      console.error("Dados do usuário incompletos para envio de email");
      return;
    }

    const templatePath = path.join(
      process.cwd(),
      "email-templates",
      "welcome.html"
    );

    let emailHtml = fs.readFileSync(templatePath, "utf-8");

    emailHtml = emailHtml.replace("{{name}}", user.name);

    const mailOptions = {
      from: `"PiggyXP" <piggyxp.oficial@gmail.com>`,
      to: user.email,
      subject: " Bem-vindo à PiggyXP!",
      text: `Olá ${user.name}, seja bem-vindo à PiggyXP!`,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email de boas-vindas enviado:", info.response);

    req.emailInfo = info;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
  }
};

export default autoemailWelcome;
