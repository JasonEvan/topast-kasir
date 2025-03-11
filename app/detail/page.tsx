"use client";

import DetailCard from "@/components/DetailCard";
import InputForm from "@/components/InputForm";
import { useCountOrder } from "@/hooks/useCountOrderStore";
import { useOrder } from "@/hooks/useOrderStore";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { formatter } from "@/lib/common/formatter";
import { errorAlert, successAlert } from "@/lib/sweetalert/alert";
import { Menu } from "@/lib/types/type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    snap: {
      pay: (token: string, { onClose }: { onClose?: () => void }) => void;
    };
  }
}

export default function DetailPage() {
  useRequireAuth();
  const menus = useOrder((state) => state.menus);
  const total = useOrder((state) => state.orderedPrice);
  const resetOrder = useOrder((state) => state.resetAll);
  const resetOrderCount = useCountOrder((state) => state.resetAll);
  const router = useRouter();
  const [customerName, setCustomerName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (menus == null || menus.length < 1 || total === 0) {
      router.replace("/");
    }
  }, [menus, total, router]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = process.env.NEXT_PUBLIC_MIDTRANS_SNAP_LOCATION!;
    script.setAttribute("data-client-key", process.env.MIDTRANS_CLIENT_KEY!);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const newMenus = menus.reduce((group: Record<string, Menu[]>, curr) => {
    if (!group[curr.flavour]) {
      group[curr.flavour] = [];
    }

    group[curr.flavour].push(curr);
    return group;
  }, {});

  const makeItemDetails = (newMenus: Record<string, Menu[]>) => {
    const item_details = [];
    for (const key in newMenus) {
      item_details.push({
        id: newMenus[key][0].id,
        name: newMenus[key][0].flavour,
        price: newMenus[key][0].price,
        quantity: newMenus[key].length,
      });
    }

    return item_details;
  };

  const handleDigitalPayment = async () => {
    setIsLoading(true);
    const item_details = makeItemDetails(newMenus);

    const res = await fetch("/api/payment", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        gross_amount: total,
        item_details,
        first_name: customerName,
      }),
    });

    const data = await res.json();

    if (res.status !== 201) {
      errorAlert(data.errors);
      return;
    }

    // Masukin ke database
    const orderRes = await fetch("/api/order", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        order_id: data.order_id,
        item_details,
        customer_name: customerName,
        gross_amount: total,
        isDigital: true,
      }),
    });

    if (orderRes.status !== 200) {
      errorAlert(
        "Data is not inserted into database, please contact developer"
      );
    }

    window.snap.pay(data.data.token, {
      onClose: async function () {
        await fetch(`/api/order/${data.order_id}`, {
          cache: "no-store",
          method: "DELETE",
        });
      },
    });

    resetOrder();
    resetOrderCount();
    setIsLoading(false);
  };

  const handleCashPayment = async () => {
    setIsLoading(true);
    const item_details = makeItemDetails(newMenus);

    const res = await fetch("/api/payment", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        gross_amount: total,
        item_details,
        first_name: customerName,
      }),
    });

    const data = await res.json();

    if (res.status !== 201) {
      errorAlert(data.errors);
      return;
    }

    // Masukin ke database
    const orderRes = await fetch("/api/order", {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({
        order_id: data.order_id,
        item_details,
        customer_name: customerName,
        gross_amount: total,
        isDigital: false,
      }),
    });

    if (orderRes.status !== 200) {
      errorAlert(
        "Data is not inserted into database, please contact developer"
      );
    }

    successAlert("Pembayaran Sukses");

    resetOrder();
    resetOrderCount();
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-5 items-center h-full">
      {Object.entries(newMenus).map(([key, menu]) => (
        <DetailCard key={key} menu={menu[0]} quantity={menu.length} />
      ))}
      <div className="text-black text-lg w-full flex justify-end font-bold">
        Total: {formatter.format(total)}
      </div>
      <InputForm
        title="Customer Name?"
        placeholder="Type Here"
        text={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        otherClass="mt-7"
      />
      {!isLoading ? (
        <>
          <button className="btn btn-primary" onClick={handleDigitalPayment}>
            Digital Payment
          </button>
          <button className="btn btn-primary" onClick={handleCashPayment}>
            Cash
          </button>
        </>
      ) : (
        <span className="loading loading-spinner loading-xl"></span>
      )}
    </div>
  );
}
