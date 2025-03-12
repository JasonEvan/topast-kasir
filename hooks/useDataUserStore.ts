import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserData {
  email: string;
  isAdmin: boolean;
  setEmail: (email: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useDataUser = create<UserData>()(
  persist(
    (set) => ({
      email: "",
      isAdmin: false,
      setEmail: (email) => {
        set({ email: email });
      },
      setIsAdmin: (isAdmin) => {
        set({ isAdmin: isAdmin });
      },
    }),
    { name: "auth-storage" }
  )
);
