import { create } from "zustand";

interface CountOrderStore {
  countMenu: Record<string, number>;
  incMenu: (flavour: string) => void;
  decMenu: (flavour: string) => void;
  resetAll: () => void;
}

export const useCountOrder = create<CountOrderStore>((set) => ({
  countMenu: {},
  incMenu: (flavour) => {
    set((state) => {
      if (!state.countMenu[flavour]) {
        return {
          countMenu: {
            ...state.countMenu,
            [flavour]: 1,
          },
        };
      }

      return {
        countMenu: {
          ...state.countMenu,
          [flavour]: state.countMenu[flavour] + 1,
        },
      };
    });
  },
  decMenu: (flavour) => {
    set((state) => ({
      countMenu: {
        ...state.countMenu,
        [flavour]: state.countMenu[flavour] - 1,
      },
    }));
  },
  resetAll: () => {
    set({ countMenu: {} });
  },
}));
