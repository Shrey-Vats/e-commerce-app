import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { paramsEmial } from "@/types/types";

export async function DELETE(req: NextRequest, { params }: paramsEmial) {
    const email = params.email;
    try {
        const response = await prisma.user.delete({ where: { email}});
        return NextResponse.json({ success: true, message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error in /api/users/:id:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 }); 
    }
}