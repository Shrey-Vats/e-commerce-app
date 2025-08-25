import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    console.log(searchParams)
    const queryParams = {
      email: searchParams.get("email"),
    };
    console.log(queryParams.email);

    if (!queryParams.email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }
    const isExitingUser = await prisma.user.findUnique({
      where: { email: queryParams.email },
    });

    if (!isExitingUser) {
      return NextResponse.json(
        { success: true, message: "Email not exists" },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Email already exists", data: isExitingUser.email },
      { status: 400 }
    );
  } catch (error) {}
}
