import { formatter } from "@/lib/common/formatter";
import { Menu } from "@/lib/types/type";
import Image from "next/image";

export default function DetailCard({
  menu,
  quantity,
}: {
  menu: Menu;
  quantity: number;
}) {
  return (
    <div className="w-full h-28 flex items-center px-5 bg-slate-900 rounded-xl">
      <div className="relative lg:h-24 lg:w-32 md:h-24 md:w-32">
        {menu.imagePath != null && menu.imagePath != "" ? (
          <Image
            src={menu.imagePath}
            alt="Topast Picture"
            className="rounded-xl w-auto h-auto"
            fill
            sizes="128px"
          />
        ) : (
          <Image
            src="/img/default.jpg"
            alt="Topast Picture"
            className="rounded-xl w-auto h-auto"
            fill
            sizes="128px"
          />
        )}
      </div>
      <div className="flex flex-col ms-5 gap-3 text-white text-lg">
        <span>{menu.flavour}</span>
        <div className="flex">
          <span>{formatter.format(menu.price)}</span>
          <span className="ms-10">x{quantity}</span>
        </div>
      </div>
      <div className="flex flex-col ms-auto mt-auto mb-6 gap-3 text-white text-lg">
        {formatter.format(menu.price * quantity)}
      </div>
    </div>
  );
}
