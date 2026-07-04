import { create } from "zustand";

export const usePageStore = create((set) => ({
  page: "architecture",
  setPage: (page) => {
    set({ page: page });
  },
}));
