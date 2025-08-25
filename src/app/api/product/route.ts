import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"
export async function GET(request: NextRequest) {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json({ success: true, productsInfo: products }, {status: 200});
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}