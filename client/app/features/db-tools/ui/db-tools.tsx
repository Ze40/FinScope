import { useNavigate } from "react-router";

import { deleteData } from "@/entities/database/api/delete";
import type { INotice } from "@/features/notice/model/types";
import { useNoticeStore } from "@/stores/noticeStore";

import * as style from "./style";

interface DbToolsProps {
  className?: string;
  choosen: { [key: string]: string };
  tableIdField: string;
  tableName: string;
}

const DbTools = ({ className, choosen, tableIdField, tableName }: DbToolsProps) => {
  const { addNotice } = useNoticeStore((state) => state.actions);
  const navigate = useNavigate(); //Костыль
  const deleteHandler = async () => {
    try {
      const delRes = await deleteData(choosen[tableIdField], tableName, tableIdField);
      const notice: INotice = {
        label: "Удаление",
        message: `Удаление ${delRes.deletedId} - ${delRes.success ? "прошло успешно" : "не произошло"}`,
      };
      addNotice(notice);
      navigate(0); //Костыль
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const editHandler = () => {};

  return (
    <div className={`${style.container()} ${className}`}>
      <button type="button" className={style.btn()} onClick={deleteHandler}>
        Удалить
      </button>
      <button type="button" className={style.btn()} onClick={editHandler}>
        Изменить
      </button>
    </div>
  );
};

export default DbTools;
