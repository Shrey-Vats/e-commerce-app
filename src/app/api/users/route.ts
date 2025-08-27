//get all users
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest){
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ success: true, usersInfo: users }, {status: 200});
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error::  " + error }, { status: 500 });
    }
}