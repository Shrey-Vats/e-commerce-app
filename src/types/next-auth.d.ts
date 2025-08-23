import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    isVerified?: boolean;
    verifyToken?: String;
    verifyTokenExpiresAt?: DateTime;
    resetToken?: String;
    resetTokenExpiresAt?: DateTime;
  }

  interface Session {
    user: {
      _id?: string;
      name?: string;
      isVerified?: boolean;
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    name?: string;
    isVerified?: boolean;
  }
}