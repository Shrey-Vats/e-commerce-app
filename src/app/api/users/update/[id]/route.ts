import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { name, password, roles } = await req.json();

  try {
    if (!roles || !name || !password) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Fix role validation
    if (!["ADMIN", "USER", "SELLER"].includes(roles)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const response = await prisma.user.update({
      where: { id },
      data: { name, password: hashPassword,   roles: {
      set: [roles],  // ✅ ensures it's stored as an array
    }, },
    });

    return NextResponse.json(
      { success: true, message: "User updated successfully", userInfo: response },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/users/update/[id]:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
