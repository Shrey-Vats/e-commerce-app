import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9026b502a28ded",
    pass: "118153332e20e3",
  },
});
