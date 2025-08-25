import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest, {params}: {params: {slug: string}}) {
  const productSlug = params.slug;

  try {
    await prisma.product.delete({ where: { slug: productSlug } });
    return NextResponse.json({ success: true, message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/product/:slug:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
