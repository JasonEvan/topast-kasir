"use client";

import Skeleton from "@/components/Loading";
import { useAdminRequired } from "@/hooks/useAdminRequired";
import { useGetCurrentTime } from "@/hooks/useGetCurrentTime";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { formatter } from "@/lib/common/formatter";
import { errorAlert, successAlert } from "@/lib/sweetalert/alert";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  useRequireAuth();
  useAdminRequired();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingFetchCSV, setIsLoadingFetchCSV] = useState<boolean>(false);
  const { now } = useGetCurrentTime();
  const [penjualan, setPenjualan] = useState<number>(0);
  useEffect(() => {
    fetch("/api/order", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setPenjualan(res.data))
      .catch((err) => {
        errorAlert(err);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Skeleton />
      </div>
    );
  }

  const handleDownload = async () => {
    setIsLoadingFetchCSV(true);
    try {
      const res = await fetch("/api/download-order", {
        cache: "no-store",
      });

      if (res.status !== 200) {
        const data = await res.json();
        errorAlert(data.errors);
      } else {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "orders.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        successAlert("Berhasil mendownload");
      }
    } catch (error) {
      if (error instanceof Error) {
        errorAlert(error.message);
      } else {
        errorAlert(String(error));
      }
    }

    setIsLoadingFetchCSV(false);
  };

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
      {!isLoadingFetchCSV ? (
        <div className="w-full mt-3 flex justify-center">
          <button className="btn btn-success" onClick={handleDownload}>
            Download CSV
          </button>
        </div>
      ) : (
        <div className="w-full mt-3 flex justify-center">
          <span className="loading loading-dots loading-xl"></span>
        </div>
      )}
    </div>
  );
}
