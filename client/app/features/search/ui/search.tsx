import { useEffect, useState } from "react";

import { SearchIcon } from "lucide-react";
import { css } from "~/styled-system/css";

import { get } from "@/entities/database/api/get";
import { useClickOutside } from "@/hooks/click";
import { useDataStore } from "@/stores/dataStore";

import * as style from "./style";

interface SearchProps {
  className?: string;
}

const Search = ({ className }: SearchProps) => {
  const tableName = useDataStore((state) => state.tableName);
  const { toggle } = useDataStore((state) => state.actions);
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<string[][] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<{ [key: string]: string }[]>([]);

  const resRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  useEffect(() => {
    if (!value) return;
    get(tableName, value).then((data) => {
      if (data.rows.length === 0) {
        setError("Нет такого элемента");
        setResult(null);
        setOpen(true);
        return;
      }
      const res = data.rows.map((row) => Object.keys(row).map((key) => `${key}: ${row[key]}`));
      setResult(res);
      setError(null);
      setOpen(true);
      setData(data.rows);
    });
  }, [value]);

  return (
    <div className={css({ position: "relative" })} ref={resRef}>
      <div className={`${style.search()} ${className}`}>
        <SearchIcon />
        <input
          type="number"
          placeholder="Поиск: введите id"
          className={style.searchInput()}
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </div>
      {open && (
        <div className={style.resultBox()}>
          {error && <p>{error}</p>}
          {result &&
            result.map((res, index) => (
              <button className={style.result()} key={res[0]} onClick={() => toggle(data[index])}>
                {res.join(", ")}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
