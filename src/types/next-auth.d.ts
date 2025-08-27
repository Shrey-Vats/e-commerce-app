import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    id: string;
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    roles: string[];
    isVerified?: boolean;
    verifyToken?: String;
    verifyTokenExpiresAt?: DateTime;
    resetToken?: String;
    resetTokenExpiresAt?: DateTime;
  }

  interface Session {
    user: {
      id: string;
      _id?: string;
      name?: string;
      roles?: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    _id?: string;
    name?: string;
    roles?: string;
    isVerified?: boolean;
  }
}

export interface product {
  title: string;
  description: string;
  images: string;
  slug: string;
  price: number;
  status: string;
}
