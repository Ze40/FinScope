import { SERVER_URL } from "~/config.env";

interface DeleteResponse {
  success: boolean;
  message?: string;
  deletedIds?: string[];
  errorIds?: string[];
}

export const deleteSomeData = async (
  ids: string[],
  tableName: string,
  idField: string
): Promise<DeleteResponse> => {
  try {
    const response = await fetch(`${SERVER_URL}/database/delete-some`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        TableName: tableName,
        IdField: idField,
      },
      body: JSON.stringify({ ids }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete data");
    }

    const result: DeleteResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Failed to delete multiple data:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown deletion error",
      deletedIds: [],
      errorIds: ids,
    };
  }
};
