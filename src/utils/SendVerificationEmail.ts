import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { success } from "zod";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";
import React from "react";
import { transport } from "./mailer";
interface VerificationEmailProps {
  email: string;
  username: string;
}

const genToken = async (email: string ) => {
  try {
    const token = uuidv4();
    console.log(token);
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    const user = await prisma?.user.update({
      where: { email},
      data: {
        verifyToken: token,
        verifyTokenExpiresAt: expiry
      }
    })

    return token
  } catch (error) {
    console.error("Error generating token:", error);
  }
}
export async function sendVerificationEmail({
  email,
  username,
}: VerificationEmailProps): Promise<ApiResponse> {
  try {
    
    const token = await genToken(email);
    if (!token) {
      return {
        success: false,
        message: "Error generating token" + token,
      };
    }
    // const reesend = await resend.emails.send({
    //   from: "shreyvatsofficial@gmail.com",
    //   to: email,
    //   subject: "Verification Code",
    //  react: React.createElement(VerificationEmail, { username, token }),

    // });

    const reesend = transport.sendMail({
      from: "shreyvatsofficial@gmail.com",
      to: email,
      subject: "Verification Code",
      html: require("react-dom/server").renderToStaticMarkup(
        React.createElement(VerificationEmail, { username, token })
      ),
    })
    console.log(reesend);

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Error sending verification email"+ error,
    };
  }
}
