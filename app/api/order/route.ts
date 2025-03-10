import { addOrder, getTotalPenjualan } from "@/lib/firebase/service";
import { Order } from "@/lib/types/type";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  const insertedData = await addOrder({
    order_id: data.order_id,
    item_details: data.item_details as Order[],
    customer_name: data.customer_name,
    gross_amount: data.gross_amount,
    isDigital: data.isDigital,
  });

  return NextResponse.json(
    {
      data: insertedData,
    },
    { status: 200 }
  );
}

export async function GET() {
  const data = await getTotalPenjualan();

  return NextResponse.json(
    {
      data,
    },
    { status: 200 }
  );
}
