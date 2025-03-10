import { deleteOrder } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await deleteOrder(id);
    return NextResponse.json(
      {
        data: {
          success: true,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    if (err instanceof Error) {
      return NextResponse.json(
        {
          errors: err.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          errors: String(err),
        },
        { status: 500 }
      );
    }
  }
}
