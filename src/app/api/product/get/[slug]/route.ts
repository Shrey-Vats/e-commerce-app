import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const productSlug = params.slug;
  console.log(productSlug);

  if(!productSlug) return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 }); 
  try {
    const productInfo = await prisma.product.findUnique({
      where: { slug: productSlug },
    });

    if (!productInfo) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, productInfo: productInfo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/product/:slug:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
