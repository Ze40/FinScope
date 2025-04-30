import { useNavigate } from "react-router";

import { deleteSomeData } from "@/entities/database/api/delete";
import type { INotice } from "@/features/notice/model/types";
import { useDataStore } from "@/stores/dataStore";
import { useNoticeStore } from "@/stores/noticeStore";
import { btn } from "@/styles/reciepts/components";

import * as style from "./style";

interface DbToolsProps {
  className?: string;
}

const DbTools = ({ className }: DbToolsProps) => {
  const { addNotice } = useNoticeStore((state) => state.actions);
  const navigate = useNavigate(); //Костыль

  const selectedData = useDataStore((state) => state.selected);
  const tableIdField = useDataStore((state) => state.tableIdField);
  const tableName = useDataStore((state) => state.tableName);
  const { clear } = useDataStore((state) => state.actions);

  const deleteHandler = async () => {
    const dataIds = selectedData.map((data) => `${data["id"]}`);
    try {
      const delRes = await deleteSomeData(dataIds, tableName, tableIdField);
      console.log(delRes);
      const notice: INotice = {
        label: "Удаление",
        message: `Удаление ${delRes.deletedIds} - ${delRes.success ? "прошло успешно" : "не произошло"}`,
      };
      clear();
      addNotice(notice);
      navigate(0); //Костыль
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const editHandler = () => {};

  return (
    <div className={`${style.container()} ${className}`}>
      <button type="button" className={btn()} onClick={deleteHandler}>
        Удалить
      </button>
      <button type="button" className={btn()} onClick={editHandler}>
        Изменить
      </button>
    </div>
  );
};

export default DbTools;
