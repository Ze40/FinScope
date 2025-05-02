import { useEffect, useState } from "react";

import Modal from "react-modal";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";

import { deleteSomeData } from "@/entities/database/api/delete";
import { getAll } from "@/entities/database/api/get";
import { updateData } from "@/entities/database/api/patch";
import { addNewData } from "@/entities/database/api/post";
import DataForm from "@/features/data-form/ui/data-form";
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
  const [formData, setFormData] = useState<{ [key: string]: string }>();

  const [action, setAction] = useState<"edit" | "add" | "download" | null>(null);
  const labelRender = () => {
    switch (action) {
      case "edit":
        return "Изменить";
      case "add":
        return "Добавить";
      default:
        return "Форма";
    }
  };

  const deleteHandler = async () => {
    if (selectedData.length === 0) {
      const notice: INotice = {
        label: "Удаление",
        message: `Для удаления необходимо выбрать элементы`,
      };
      addNotice(notice);
      return;
    }
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
  const editHandler = () => {
    if (selectedData.length !== 1) {
      const notice: INotice = {
        label: "Изменение",
        message: "Для изменения выберите один элемент",
      };
      addNotice(notice);
      return;
    }
    setAction("edit");
  };
  const addHandler = () => {
    setAction("add");
  };
  const downloadHandler = async () => {
    setAction("download");
    getAll(tableName).then((data) => {
      const wb = XLSX.utils.book_new();

      // Преобразуем данные в worksheet
      const ws = XLSX.utils.json_to_sheet(data.rows);

      // Добавляем worksheet в книгу
      XLSX.utils.book_append_sheet(wb, ws, "Data");

      // Генерируем файл и скачиваем
      XLSX.writeFile(wb, `${tableName}.xlsx`);
    });
  };

  useEffect(() => {
    if (!formData) return;
    // Изменение
    if (action === "edit") {
      updateData(tableName, selectedData[0]["id"], formData)
        .then((data) => {
          if (data.success) {
            const notice: INotice = {
              label: "Изменение",
              message: `Элемент ${selectedData[0]["id"]} успешно изменен`,
            };
            addNotice(notice);
          }
        })
        .catch((err) => {
          const notice: INotice = {
            label: "Изменение",
            message: `При изменении элемента: ${selectedData[0]["id"]} произошла ошибка: ${err}`,
          };
          addNotice(notice);
        });
    }

    if (action === "add") {
      addNewData(formData, tableName)
        .then(() => {
          const notice: INotice = {
            label: "Добавление",
            message: `Добавление элемента произошло успешно`,
          };
          addNotice(notice);
        })
        .catch((error) => {
          const notice: INotice = {
            label: "Добавление",
            message: `При при добавлении элемента: ${selectedData[0]["id"]} произошла ошибка: ${error}`,
          };
          addNotice(notice);
        });
    }
    if (action === "download") {
      console.log(1);
    }
    navigate(0);
  }, [formData]);

  return (
    <div className={`${style.container()} ${className}`}>
      <button type="button" className={btn()} onClick={deleteHandler}>
        Удалить
      </button>
      <button type="button" className={btn()} onClick={editHandler}>
        Изменить
      </button>
      <button type="button" className={btn()} onClick={addHandler}>
        Добавить
      </button>
      <button type="button" className={btn()} onClick={downloadHandler}>
        Скачать
      </button>
      <Modal
        isOpen={action === "add" || action === "edit"}
        onRequestClose={() => setAction(null)}
        className={style.modal()}
        overlayClassName={style.modalOverlay()}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        ariaHideApp={false}
      >
        <DataForm
          label={labelRender()}
          onSetData={setFormData}
          tableName={tableName}
          initialData={action === "edit" ? selectedData[0] : undefined}
        />
      </Modal>
    </div>
  );
};

export default DbTools;
