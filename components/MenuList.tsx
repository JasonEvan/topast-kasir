import { useEffect, useState } from "react";
import Card from "./Card";
import { Menu } from "@/lib/types/type";
import Skeleton from "./Loading";

export default function MenuList() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/menu", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((res) => setMenus(res.data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      {menus.map((menu, index) => (
        <Card menu={menu} key={menu.id || index} />
      ))}
    </div>
  );
}
