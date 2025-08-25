import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import {prisma} from "@/lib/prisma";
interface Credentials {
  email: string;
  password: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
       const {email , password} = credentials as Credentials;

       console.log(email, password)

        try {
          const user = await prisma?.user.findUnique({
            where: { email },
          });

          console.log(user)
          if (!user) return null;

          const isValidPassword = await bcrypt.compare(password, user.password);

          console.log(isValidPassword)
          if (!isValidPassword) {
            return null;
          }

          if (!user.isVerified) {
            return null;
          }

          return user;
        } catch (error) {
          console.error(error)
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    })
    
  ],
  callbacks: {
    async session({ session, token }) {
        if(token){
          session.user._id = token._id;
          session.user.isVerified = token.isVerified;
          session.user.name = token.name;
          session.user.roles = token.roles;
        }
      return session;
    },
    async jwt({ token, user }) {
        if (user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.name = user.name;
            token.roles = user.roles;
        }
      return token;
    }
  },
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
};
