import { create } from "zustand";

interface DataStoreActions {
  toggle: (data: { [key: string]: string }) => void;
  setTableIdField: (tableIdField: string) => void;
  setTableName: (tableName: string) => void;
  isChoosen: (data: { [key: string]: string }) => boolean;
  clear: () => void;
}

interface DataStoreState {
  selected: { [key: string]: string }[];
  tableIdField: string;
  tableName: string;
  actions: DataStoreActions;
}

export const useDataStore = create<DataStoreState>((set, get) => ({
  selected: [],
  tableIdField: "",
  tableName: "",
  actions: {
    toggle: (data) =>
      set((state) => {
        const isSelected = state.selected.some((d) => d["id"] === data["id"]);
        return {
          selected: isSelected
            ? state.selected.filter((d) => d["id"] !== data["id"])
            : [...state.selected, data],
        };
      }),
    setTableIdField: (tableIdField) =>
      set(() => {
        return {
          tableIdField: tableIdField,
        };
      }),
    setTableName: (tableName) =>
      set(() => {
        return {
          tableName: tableName,
        };
      }),
    isChoosen: (data) => {
      const { selected } = get();
      return selected.some((d) => d["id"] === data["id"]);
    },
    clear: () =>
      set(() => {
        return { selected: [] };
      }),
  },
}));
