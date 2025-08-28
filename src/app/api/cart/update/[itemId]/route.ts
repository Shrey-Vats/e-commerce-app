import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
export async function PUT(
  request:  NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { quantity } = await request.json();
    const { itemId } = params;

    if (quantity <= 0) {
      return NextResponse.json(
        { success: false, message: "Quantity must be greater than 0" },
        { status: 400 }
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: {
          select: { title: true, images: true, stock: true },
        },
      },
    });

    return NextResponse.json({ success: true, item: updatedItem });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await prisma.cartItem.delete({
      where: { id: params.itemId },
    });

    return NextResponse.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}