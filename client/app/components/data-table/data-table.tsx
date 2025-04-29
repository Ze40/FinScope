import { useEffect, useRef, useState } from "react";

import { css } from "~/styled-system/css";

import type { DatabaseData } from "@/entities/database/model/types";
import { DbTools, type IFilter } from "@/features";

import * as style from "./style";

interface DataTableProps {
  data: DatabaseData;
  tableName: string;
  filters?: IFilter[];
  onLoadMore: () => void;
  tableIdField: string;
  tableLabel: string;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

const DataTable = ({
  data,
  tableName,
  filters,
  onLoadMore,
  tableIdField,
  tableLabel,
  isLoadingMore = false,
  hasMore = true,
}: DataTableProps) => {
  const [correctFields, setCorrectFields] = useState<string[]>(data?.fields || []);
  const observerRef = useRef<HTMLDivElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [choosen, setChoosen] = useState<{ [key: string]: string } | null>(null);

  useEffect(() => {
    const newFields = filters ? filters.map((filter) => filter.label) : data?.fields || [];
    setCorrectFields(newFields);
  }, [filters, data?.fields]);

  useEffect(() => {
    const current = observerRef.current;
    if (!current || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && onLoadMore(), {
      root: tableContainerRef.current,
      threshold: 0.1,
      rootMargin: "100px",
    });

    observer.observe(current);
    return () => observer.disconnect();
  }, [onLoadMore, hasMore, isLoadingMore]);

  if (!data?.rows?.length) {
    return <div className={style.emptyState()}>Нет данных для отображения</div>;
  }

  return (
    <div ref={tableContainerRef} className={style.tableContainer()}>
      <table className={style.table()}>
        <caption className={style.tableName()}>{tableLabel}</caption>
        <thead className={style.tableHeader()}>
          <tr className={style.tableRow()}>
            {correctFields.map((name) => (
              <th key={name} className={style.headerCell()} scope="col">
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={style.tableBody()}>
          {data.rows.map((row) => (
            <tr
              className={style.tableRow({
                choosen: choosen?.[tableIdField] === row[tableIdField],
              })}
              key={`${row[tableIdField]}`}
              onClick={() => setChoosen(choosen?.[tableIdField] === row[tableIdField] ? null : row)}
            >
              {correctFields.map((name) => (
                <td className={style.tableCell()} key={`${name}-${row[tableIdField]}`}>
                  {row[name] ?? "-"}
                </td>
              ))}
              <td className={style.dbTools()}>
                {choosen?.[tableIdField] === row[tableIdField] && (
                  <DbTools choosen={choosen} tableIdField={tableIdField} tableName={tableName} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {hasMore && (
        <div
          ref={observerRef}
          className={css({
            height: "20px",
            width: "100%",
            visibility: "hidden",
          })}
        />
      )}

      {isLoadingMore && (
        <div className={css({ padding: "20px", textAlign: "center" })}>Загрузка данных...</div>
      )}
    </div>
  );
};

export default DataTable;
