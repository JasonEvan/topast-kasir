"use client";

import Skeleton from "@/components/Loading";
import { useGetCurrentTime } from "@/hooks/useGetCurrentTime";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { formatter } from "@/lib/common/formatter";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  useRequireAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { now } = useGetCurrentTime();
  const [penjualan, setPenjualan] = useState<number>(0);
  useEffect(() => {
    fetch("/api/order", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setPenjualan(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center mt-5">
      <div className="text-2xl font-bold text-black">TOTAL PENJUALAN</div>
      <div className="stats stats-vertical lg:stats-horizontal shadow mt-5">
        <div className="stat">
          <div className="stat-title">Penjualan</div>
          <div className="stat-value">{formatter.format(penjualan)}</div>
          <div className="stat-desc">Jan 1st - {now}</div>
        </div>
      </div>
    </div>
  );
}
