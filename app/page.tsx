"use client";

import BottomBar from "@/components/BottomBar";
import MenuList from "@/components/MenuList";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function Home() {
  useRequireAuth();

  return (
    <div className="flex flex-col items-center h-full">
      <MenuList />
      <BottomBar />
    </div>
  );
}
