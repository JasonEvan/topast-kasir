import { Menu } from "@/lib/types/type";
import { create } from "zustand";

interface OrderStore {
  orderedQuantity: number;
  orderedPrice: number;
  menus: Menu[];
  addMenu: (menu: Menu) => void;
  removeMenu: (menu: Menu) => void;
  resetAll: () => void;
}

export const useOrder = create<OrderStore>((set) => ({
  orderedQuantity: 0,
  orderedPrice: 0,
  menus: [],
  addMenu: (menu) => {
    set((state) => ({
      orderedPrice: state.orderedPrice + menu.price,
      orderedQuantity: state.orderedQuantity + 1,
      menus: [...state.menus, menu],
    }));
  },
  removeMenu: (menu) => {
    set((state) => {
      const index = state.menus.findIndex((m) => m.id === menu.id);
      if (index === -1) return state;

      return {
        orderedPrice: state.orderedPrice - menu.price,
        orderedQuantity: state.orderedQuantity - 1,
        menus: [
          ...state.menus.slice(0, index),
          ...state.menus.slice(index + 1),
        ],
      };
    });
  },
  resetAll: () => {
    set({
      orderedQuantity: 0,
      orderedPrice: 0,
      menus: [],
    });
  },
}));
