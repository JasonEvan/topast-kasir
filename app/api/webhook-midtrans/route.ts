import { updateStatusOrder } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.transaction_status || !body.order_id) {
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });
    }

    const { order_id, transaction_status, fraud_status } = body;

    if (transaction_status === "capture") {
      if (fraud_status === "accept") {
        console.log(`Order ${order_id} berhasil dibayar`);
        updateStatusOrder(order_id, transaction_status);
      }
    } else if (transaction_status === "settlement") {
      console.log(`Order ${order_id} berhasil diselesaikan`);
      updateStatusOrder(order_id, transaction_status);
    } else if (transaction_status === "pending") {
      console.log(`Order ${order_id} masih pending`);
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "expire"
    ) {
      console.log(`Order ${order_id} gagal`);
      updateStatusOrder(order_id, transaction_status);
    }

    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Server error " }, { status: 500 });
  }
}
