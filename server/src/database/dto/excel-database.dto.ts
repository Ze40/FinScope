export interface ExcelColumn {
  header: string;
  key: string;
  width?: number;
}

export interface ExcelExportOptions {
  filename?: string;
  columns: ExcelColumn[];
  data: Record<string, unknown>[];
}
