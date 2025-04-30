export class DeleteMultipleDto {
  ids: string[];
  tableName: string;
  idField: string;
}

export interface DeleteResponse {
  success: boolean;
  message?: string;
  deletedIds?: string[];
  errorIds?: string[];
}
