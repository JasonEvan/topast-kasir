import { useOrder } from "@/hooks/useOrderStore";
import { ArrowRight } from "lucide-react";
import { formatter } from "@/lib/common/formatter";
import { useRouter } from "next/navigation";

export default function BottomBar() {
  const orderedQuantity = useOrder((state) => state.orderedQuantity);
  const orderedPrice = useOrder((state) => state.orderedPrice);
  const router = useRouter();

  if (orderedQuantity == 0 && orderedPrice == 0) {
    return null;
  }

  return (
    <button
      className="w-[85vw] h-16 mb-3 z-1 bg-green-400 fixed bottom-0 rounded-xl flex justify-between items-center text-black px-5"
      onClick={() => router.push("/detail")}
    >
      <span>{orderedQuantity} Items</span>
      <div className="flex gap-3">
        <span>{formatter.format(orderedPrice)}</span>
        <ArrowRight color="#000" size={24} />
      </div>
    </button>
  );
}
