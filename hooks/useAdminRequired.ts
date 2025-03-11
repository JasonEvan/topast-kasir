import { useRouter } from "next/navigation";
import { useDataUser } from "./useDataUserStore";
import { useEffect } from "react";

export const useAdminRequired = () => {
  const isAdmin = useDataUser((state) => state.isAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.replace("/");
    }
  }, [isAdmin, router]);
};
