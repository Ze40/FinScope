import { SERVER_URL } from "~/config.env";

interface DeleteResponse {
  success: boolean;
  message?: string;
  deletedId?: string;
}

export const deleteData = async (
  id: string,
  tableName: string,
  idField: string
): Promise<DeleteResponse> => {
  if (!id) {
    throw new Error("ID is required for deletion");
  }

  try {
    const response = await fetch(`${SERVER_URL}/database/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        TableName: tableName,
        IdFiled: idField,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete data");
    }

    const result: DeleteResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to delete data:", error);
    throw error instanceof Error ? error : new Error("Unknown deletion error");
  }
};
