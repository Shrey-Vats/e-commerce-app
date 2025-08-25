import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export async function POST(req: NextRequest) {
  try {
    const {title, description, images, categoryId, brandId, price, status} = await req.json(); // directly parse the JSON

    if (!title || !description || !images || !categoryId || !brandId || !price ) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }
    const product = await prisma.product.create({
      data: {
        title,
        description,
        images,
        categoryId,
        brandId,
        price,
        status,
        slug: title.toLowerCase().replace(/\s+/g, "-")
      },
    });

    console.log(product);

    return NextResponse.json({ success: true, product: product });
  } catch (error) {
    console.error("Error in /api/product/add:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
