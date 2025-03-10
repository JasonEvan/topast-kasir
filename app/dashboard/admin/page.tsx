"use client";

import Skeleton from "@/components/Loading";
import { AdminTable } from "@/components/Table";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { errorAlert } from "@/lib/sweetalert/alert";
import { User } from "@/lib/types/type";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [admins, setAdmins] = useState<User[]>([]);
  const [isLoadingFetchingData, setIsLoadingFetchingData] =
    useState<boolean>(true);

  useRequireAuth();
  useEffect(() => {
    fetch("/api/admin", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setAdmins(res.data))
      .catch((err) => {
        errorAlert(err);
        console.error(err);
      })
      .finally(() => setIsLoadingFetchingData(false));
  }, []);

  if (isLoadingFetchingData) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center mt-5">
      <div className="text-2xl font-bold text-black">ADMIN</div>
      <div className="mt-5 w-full flex items-center justify-end">
        <Link href="/dashboard/admin/create">
          <button className="btn btn-success me-16">Add Admin</button>
        </Link>
      </div>
      <AdminTable admins={admins} />
    </div>
  );
}
