import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

export function useRequireAuth() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);
}
