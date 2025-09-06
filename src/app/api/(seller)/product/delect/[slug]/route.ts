import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { paramsSlug } from "@/types/types";
export async function DELETE(req: NextRequest, {params}: paramsSlug) {
  const productSlug = params.slug;

  if(!productSlug) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });

  try {
    const response = await prisma.product.delete({ where: { slug: productSlug } });

    if(!response) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    
    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/product/:slug:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
