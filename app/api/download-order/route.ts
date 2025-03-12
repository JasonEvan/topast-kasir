import { dateFormatter } from "@/lib/common/formatter";
import { getAllData } from "@/lib/firebase/service";
import { OrderOnDatabase } from "@/lib/types/type";
import { NextResponse } from "next/server";

export async function GET() {
  let data;
  try {
    data = await getAllData<OrderOnDatabase>("orders");
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        errors: "Gagal dapat data",
      },
      { status: 500 }
    );
  }

  let csvContent = "Customer,Flavour,Quantity,Price,Date\n";
  data.forEach((order) => {
    const date = dateFormatter.format(new Date(order.created_at));
    order.item_details.forEach((item) => {
      csvContent += `${order.customer_name},${item.name},${item.quantity},${
        item.price
      },${date.replace(",", "")}\n`;
    });
  });

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=orders.csv",
    },
  });
}
