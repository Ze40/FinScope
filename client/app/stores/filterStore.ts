import { create } from "zustand";

import type { IFilter } from "@/features";

interface FilterStoreActions {
  toggle: (filter: IFilter) => void;
  set: (filters: IFilter[]) => void;
}

interface FilterStoreState {
  selectedFilters: IFilter[];
  filters: IFilter[];
  actions: FilterStoreActions;
}

export const useFilterStore = create<FilterStoreState>((set) => ({
  filters: [],
  selectedFilters: [],
  actions: {
    toggle: (filter) =>
      set((state) => {
        const isSelected = state.selectedFilters.some((f) => f.id === filter.id);
        return {
          selectedFilters: isSelected
            ? state.selectedFilters.filter((f) => f.id !== filter.id)
            : [...state.selectedFilters, filter],
        };
      }),
    set: (filters) => set({ filters, selectedFilters: filters }),
  },
}));
