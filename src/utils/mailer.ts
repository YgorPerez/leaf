import nodemailer from "nodemailer";

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_EMAIL_ADDRESS,
      pass: process.env.SENDER_EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Leaf Team" ${process.env.SENDER_EMAIL_ADDRESS}`,
    to: email,
    subject: "Faça o login na sua conta",
    html: `Faça o login na sua conta clicando neste link <a href="${url}/login#token=${token}">Aqui</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
