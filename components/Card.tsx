import { useOrder } from "@/hooks/useOrderStore";
import { Menu } from "@/lib/types/type";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { formatter } from "@/lib/common/formatter";
import { useCountOrder } from "@/hooks/useCountOrderStore";

export default function Card({ menu }: { menu: Menu }) {
  const addMenu = useOrder((state) => state.addMenu);
  const removeMenu = useOrder((state) => state.removeMenu);
  const { countMenu, incMenu, decMenu } = useCountOrder();

  return (
    <div className="card bg-slate-900 w-96 shadow-xl">
      <div className="flex justify-center h-full pt-5">
        {menu.imagePath != null && menu.imagePath != "" ? (
          <Image
            src={menu.imagePath}
            alt="Topast-Picture"
            className="rounded-xl w-auto h-auto"
            width={200}
            height={138}
            priority={true}
          />
        ) : (
          <Image
            src="/img/default.jpg"
            alt="Topast-Picture"
            className="rounded-xl w-auto h-auto"
            width={200}
            height={138}
          />
        )}
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white">{menu.flavour}</h2>
        <p className="text-white">{formatter.format(menu.price)}</p>
        <div className="card-actions">
          {countMenu[menu.flavour] == 0 || !countMenu[menu.flavour] ? (
            <button
              className="btn btn-primary"
              onClick={() => {
                incMenu(menu.flavour);
                addMenu(menu);
              }}
            >
              Buy
            </button>
          ) : (
            <div className="flex gap-1">
              <button
                className="btn btn-primary"
                onClick={() => {
                  decMenu(menu.flavour);
                  removeMenu(menu);
                }}
              >
                <Minus />
              </button>
              <div className="w-20 bg-slate-200 rounded-xl text-center flex justify-center items-center text-black">
                {countMenu[menu.flavour]}
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  incMenu(menu.flavour);
                  addMenu(menu);
                }}
              >
                <Plus />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
