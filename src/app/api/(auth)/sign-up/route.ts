import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/Schema/signUpSchema";
import { sendVerificationEmail } from "@/utils/SendVerificationEmail";

export async function POST(request: NextRequest) {
    
  try {
    const { name, email, password } = await request.json();

    // validate
    const result = signUpSchema.safeParse({ name, email, password });
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.issues[0].message },
        { status: 400 }
      );
    }

    let userId: string;

    // check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });

    console.log(existingUser)

    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { success: false, message: "User already exists" },
          { status: 400 }
        );
      }

      // update password
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
      });
      userId = updatedUser.id;
    } else {
      // create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
      userId = newUser.id;
    }

    // send verification email
    const emailResponse = await sendVerificationEmail({
      email,
      username: name,
    });

    if (!emailResponse.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Error sending verification email: " + emailResponse.message,
        },
        { status: 500 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        userId,
        emailStatus: emailResponse.message,
      },
      { status: 201 }
    );

    response.cookies.set("id", userId, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
