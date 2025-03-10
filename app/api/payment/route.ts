import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  const authorization = btoa(`${serverKey}:`);
  const orderId = randomUUID();
  const data = await request.json();

  const payload = {
    transaction_details: {
      order_id: orderId,
      gross_amount: data.gross_amount,
    },
    item_details: data.item_details,
    customer_details: {
      first_name: data.first_name,
    },
  };

  const res = await fetch(`${process.env.MIDTRANS_LINK}`, {
    cache: "no-store",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${authorization}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status !== 201) {
    return NextResponse.json(
      {
        errors: "Gagal membuat transaksi",
      },
      { status: res.status }
    );
  }

  const response = await res.json();

  return NextResponse.json(
    {
      data: response,
      order_id: orderId,
    },
    { status: 201 }
  );
}
