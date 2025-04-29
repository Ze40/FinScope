"use client";

import { useEffect, useState } from "react";

import { useFetcher, useLoaderData } from "react-router";
import { css } from "~/styled-system/css";

import { DataTable } from "@/components";
import { getData } from "@/entities/database/api/get";
import type { DatabaseData } from "@/entities/database/model/types";
import { useFilterStore } from "@/stores";
import { DataSearch } from "@/widgets";

type PageData = {
  data: DatabaseData;
  nextPage: number | undefined;
};

export async function loader() {
  return await getData({ pageParam: 1 });
}

const Data = () => {
  const selectedFilters = useFilterStore((state) => state.selectedFilters);
  const { set } = useFilterStore((state) => state.actions);

  const initialData = useLoaderData() as PageData;
  const fetcher = useFetcher<PageData>();

  const [pages, setPages] = useState<PageData[]>([initialData]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleLoadMore = async () => {
    const nextPage = pages[pages.length - 1].nextPage;
    if (nextPage && !isLoading) {
      setIsLoading(true);
      setError(null);

      try {
        const newPage = await getData({ pageParam: nextPage });
        setPages((prev) => [...prev, newPage]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (fetcher.data) {
      setPages([...pages, fetcher.data]);
    }
  }, [fetcher.data]);

  useEffect(() => {
    const firstPageFields = pages[0]?.data?.fields;
    if (firstPageFields) {
      const filters = firstPageFields.map((label: string, id: number) => ({
        label,
        id,
      }));
      set(filters);
    }
  }, [pages, set]);

  const tableData = {
    fields: pages[0]?.data?.fields || [],
    rows: pages.flatMap((page) => page.data?.rows || []) || [],
  };

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      })}
    >
      <DataSearch className={css({ marginBottom: "30px" })} />

      {fetcher.state === "loading" && <div>Загрузка...</div>}
      {fetcher.state === "idle" && pages.length === 0 && <div>Нет данных</div>}
      {error && <div>Ошибка: {error.message}</div>}
      {tableData.rows.length > 0 && (
        <DataTable
          tableIdField="stat_data_id"
          data={tableData}
          tableLabel="Статистические данные"
          tableName="stat_data"
          filters={selectedFilters}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoading}
          hasMore={!!pages[pages.length - 1].nextPage}
        />
      )}
    </div>
  );
};

export default Data;
