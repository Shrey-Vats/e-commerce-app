import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const verifySchema = z.object({
  token: z.string().min(1, "Token is required"),
});

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const token = searchParams.get("token");

    const validation = verifySchema.safeParse({ token });
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiresAt: { gt: new Date() }
      },
      select: {
        id: true,
        email: true,
        name: true,
        isVerified: true
      }
    });

    if (!user) {
      // Check if token exists but expired
      const expiredUser = await prisma.user.findFirst({
        where: { verifyToken: token },
        select: { email: true, verifyTokenExpiresAt: true }
      });

      if (expiredUser) {
        return NextResponse.json(
          { 
            success: false, 
            message: "Verification link has expired. Please request a new verification email.",
            reason: "expired_token",
            email: expiredUser.email
          },
          { status: 410 }
        );
      }

      return NextResponse.json(
        { 
          success: false, 
          message: "Invalid or expired verification link.",
          reason: "invalid_token"
        },
        { status: 404 }
      );
    }

    if (user.isVerified) {
      return NextResponse.json(
        { 
          success: true, 
          message: "Email is already verified. You can now sign in.",
          reason: "already_verified"
        },
        { status: 200 }
      );
    }

    // Verify the user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiresAt: null,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Email verified successfully! You can now sign in.",
        user: {
          name: user.name,
          email: user.email
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed. Please try again." },
      { status: 500 }
    );
  }
}
