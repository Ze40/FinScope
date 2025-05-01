import { SERVER_URL } from "~/config.env";

export const addNewData = async (
  data: {
    [key: string]: string;
  },
  tableName: string
): Promise<{ success: boolean }> => {
  try {
    const response = await fetch(`${SERVER_URL}/database/add`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        TableName: tableName,
        Authorization: "Bearer your_token", // если нужна авторизация
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Ошибка добавления");
    return await response.json();
  } catch (error) {
    console.error("Ошибка добавления:", error);
    throw error;
  }
};
