import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { paramsEmial } from "@/types/types";
import { getToken } from "next-auth/jwt";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log(token);
  const email = params.email;
  console.log(email);
  console.log("Token email:", token?.email);
console.log("Param email:", email);

  try {
    if (!email) {
      console.log("first place", email);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 401 }
      );
    }

    if (token?.email !== email) {
      console.log("second place", token);
      return NextResponse.json(
        { success: false, message: "User not found or not authorized" },
        { status: 402 }
      );
    }

    const userInfo = await prisma.user.findUnique({ where: { email: email } });

    if (!userInfo) {
      console.log("third place", userInfo);
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { success: true, userInfo: userInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
