import { create } from "zustand";

interface userData {
  email: string;
  isAdmin: boolean;
  setEmail: (email: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useDataUser = create<userData>((set) => ({
  email: "",
  isAdmin: false,
  setEmail: (email) => {
    set({ email: email });
  },
  setIsAdmin: (isAdmin) => {
    set({ isAdmin: isAdmin });
  },
}));
