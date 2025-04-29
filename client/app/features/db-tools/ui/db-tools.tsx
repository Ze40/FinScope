import { deleteData } from "@/entities/database/api/delete";

import * as style from "./style";

interface DbToolsProps {
  className?: string;
  choosen: { [key: string]: string };
  tableIdField: string;
  tableName: string;
}

const DbTools = ({ className, choosen, tableIdField, tableName }: DbToolsProps) => {
  const deleteHandler = async () => {
    try {
      const delRes = await deleteData(choosen[tableIdField], tableName, tableIdField);
      //   const notice: INotice = {
      //     label: "Удаление",
      //     message: `Удаление ${delRes.deletedId} - ${delRes.success ? "прошло успешно" : "не произошло"}`,
      //   };
      //   dispatch(addNotice(notice));
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
