import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { INotice } from "@/features/notice/model/types";

interface NoticeStoreActions {
  addNotice: (notice: INotice) => void;
  removeNotice: (id: number) => void;
  setNotices: (notice: INotice[]) => void;
  clearNotices: () => void;
}

interface NoticeStoreState {
  notices: INotice[];
  count: number;
  maxCount: number;
  actions: NoticeStoreActions;
}

export const useNoticeStore = create<NoticeStoreState>()(
  persist(
    (set, get) => ({
      notices: [],
      count: 0,
      maxCount: 5,
      actions: {
        addNotice: (notice) => {
          const { notices, maxCount } = get();
          const newNotice: INotice = {
            ...notice,
            id: notices.length > 0 ? Math.max(...notices.map((n) => n.id || 0)) + 1 : 1,
          };

          set((state) => {
            const updatedNotices = [...state.notices, newNotice];
            const trimmedNotices =
              updatedNotices.length > maxCount
                ? updatedNotices.slice(updatedNotices.length - maxCount)
                : updatedNotices;

            return {
              notices: trimmedNotices,
              count: trimmedNotices.length,
            };
          });
        },

        removeNotice: (id) =>
          set((state) => {
            const filteredNotices = state.notices.filter((n) => n.id !== id);
            return {
              notices: filteredNotices,
              count: filteredNotices.length,
            };
          }),

        setNotices: (notices) =>
          set({
            notices,
            count: notices.length,
          }),

        clearNotices: () =>
          set({
            notices: [],
            count: 0,
          }),
      },
    }),
    {
      name: "notice-storage",
      partialize: (state) => ({
        notices: state.notices,
        count: state.count,
      }),
    }
  )
);
