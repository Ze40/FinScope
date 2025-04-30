import { useEffect, useState } from "react";

import { css } from "~/styled-system/css";

import { Input } from "@/components";
import { getFields } from "@/entities/database/api/get";
import { btn } from "@/styles/reciepts/components";
import { title } from "@/styles/reciepts/font";

import * as style from "./style";

interface DataFormProps {
  label: string;
  onSetData: (data: { [key: string]: string }) => void;
  tableName: string;
  initialData?: { [key: string]: string };
}

const DataForm = ({ label, onSetData, tableName, initialData }: DataFormProps) => {
  const [fields, setFields] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ [key: string]: string }>(initialData || {});
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const key in data) {
      if (!data[key]) {
        setError("Все поля должны быть заполнены");
        return;
      }
    }
    setError(null);
    onSetData(data);
  };

  useEffect(() => {
    getFields(tableName)
      .then((data) => {
        setFields(data);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }, []);

  return (
    <form className={style.form()} onSubmit={submitHandler}>
      <h5 className={title()}>{label}</h5>
      <div className={style.inputContainer()}>
        {fields.map((field) => (
          <Input
            key={field}
            type="text"
            label={field}
            value={data[field]}
            onChange={({ target }) =>
              setData((prev) => ({
                ...prev,
                [field]: target.value,
              }))
            }
          />
        ))}
      </div>
      <div className={css({ color: "red" })}>{error}</div>
      <button
        type="submit"
        className={css(btn.raw(), { fontSize: "md", _hover: { scale: "1.05" } })}
      >
        Отправить
      </button>
    </form>
  );
};

export default DataForm;
