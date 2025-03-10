"use client";

import Skeleton from "@/components/Loading";
import { MenuTable } from "@/components/Table";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { errorAlert } from "@/lib/sweetalert/alert";
import { Menu } from "@/lib/types/type";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuPage() {
  useRequireAuth();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/api/menu", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setMenus(res.data))
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

  return (
    <div className="h-full flex flex-col items-center mt-5">
      <div className="text-2xl font-bold text-black">MENU</div>
      <div className="mt-5 w-full flex items-center justify-end">
        <Link href="/dashboard/menu/create">
          <button className="btn btn-success me-16">Add Menu</button>
        </Link>
      </div>
      <MenuTable menus={menus} />
    </div>
  );
}
