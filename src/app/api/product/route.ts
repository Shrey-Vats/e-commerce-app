import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma"
import { getServerSession } from "next-auth";
import { authOptions } from "../(auth)/auth/[...nextauth]/options";
export async function GET(request: NextRequest) {
    try {
        const products = await prisma.product.findMany();
        return NextResponse.json({ success: true, productsInfo: products }, {status: 200});
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.roles?.includes("ADMIN")  || !session.user.roles?.includes("SELLER")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      description,
      images,
      categoryId,
      brandId,
      price,
      discountPrice,
      stock,
      variants,
      tags,
      attributes,
    } = await request.json();

    const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const sku = `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const product = await prisma.product.create({
      data: {
        title,
        slug,
        description,
        images,
        categoryId,
        brandId,
        price,
        discountPrice,
        sku,
        stock,
        tags: tags || [],
        attributes,
        variants: {
          create: variants?.map((variant: any) => ({
            name: variant.name,
            value: variant.value,
            price: variant.price,
            stock: variant.stock,
            sku: `${sku}-${variant.name}-${variant.value}`.toUpperCase(),
          })) || [],
        },
      },
      include: {
        category: true,
        brand: true,
        variants: true,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}
