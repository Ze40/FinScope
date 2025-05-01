import { SERVER_URL } from "~/config.env";

export const updateData = async (
  tableName: string,
  id: string,
  newData: object
): Promise<{ success: boolean; affectedRows: number }> => {
  try {
    const response = await fetch(`${SERVER_URL}/database/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        TableName: tableName,
        Authorization: "Bearer your_token", // если нужна авторизация
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) throw new Error("Ошибка обновления");
    return await response.json();
  } catch (error) {
    console.error("Ошибка изменения:", error);
    throw error;
  }
};
