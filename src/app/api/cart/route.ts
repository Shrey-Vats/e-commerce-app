import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../(auth)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                title: true,
                images: true,
                price: true,
                discountPrice: true,
                stock: true,
                slug: true,
              },
            },
            variant: true,
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({
        success: true,
        cart: { items: [], total: 0, itemCount: 0 },
      });
    }

    const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    return NextResponse.json({
      success: true,
      cart: { ...cart, total, itemCount },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}