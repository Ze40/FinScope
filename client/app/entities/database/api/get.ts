import { SERVER_URL } from "~/config.env";

import type { DatabaseData } from "../model/types";

export const getData = async ({
  pageParam,
}: {
  pageParam: unknown;
}): Promise<{ data: DatabaseData; nextPage: number }> => {
  try {
    const response = await fetch(`${SERVER_URL}/database/data?page=${pageParam}&limit=20`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DatabaseData = await response.json();
    return { data, nextPage: Number(pageParam) + 1 };
  } catch (error) {
    console.error("Failed to fetch database data:", error);
    throw error;
  }
};
