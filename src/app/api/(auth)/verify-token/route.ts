import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
;
    const token = searchParams.get("token");

    console.log("token", token);

    if( !token){
      return NextResponse.json(
        { success: false, message: "Email or token is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findFirst({
      where: {
        verifyToken: token,
        verifyTokenExpiresAt: { gt: new Date() }
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found or token has expired" },
        { status: 404 }
      );
    }

    await prisma.user.update({
      where: { email: user.email },
      data: {
        isVerified: true,
        verifyToken: null,
        verifyTokenExpiresAt: null,
      },
    });

    return NextResponse.json(
      { success: true, message: "User verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      { success: false, message: "Error generating token" },
      { status: 500 }
    );
  }
}
