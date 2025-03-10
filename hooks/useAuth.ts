import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/jwt", {
          cache: "no-store",
          credentials: "include",
          method: "POST",
        });

        if (res.status !== 200) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { user, isLoading };
}
