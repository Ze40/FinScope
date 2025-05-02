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

export const getFields = async (tableName: string): Promise<string[]> => {
  try {
    const response = await fetch(`${SERVER_URL}/database/fields`, {
      headers: {
        TableName: tableName,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fields = await response.json();
    return fields;
  } catch (error) {
    console.error("Failed to fetch database data:", error);
    throw error;
  }
};

export const getAll = async (tableName: string): Promise<DatabaseData> => {
  try {
    const response = await fetch(`${SERVER_URL}/database/all`, {
      method: "GET",
      headers: {
        TableName: tableName,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: DatabaseData = await response.json();
    return data;
  } catch (err) {
    console.error("Excel download failed:", err);
    throw err;
  }
};
