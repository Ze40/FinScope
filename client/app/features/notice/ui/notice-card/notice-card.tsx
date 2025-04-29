import { X } from "lucide-react";

import { useNoticeStore } from "@/stores/noticeStore";

import type { INotice } from "../../model/types";
import * as style from "./style";

interface NoticeCardProps extends INotice {
  className?: string;
  id: number;
}

const NoticeCard = ({ className, label, message, id }: NoticeCardProps) => {
  const { removeNotice } = useNoticeStore((state) => state.actions);
  return (
    <div className={`${style.box()} ${className}`}>
      <div className={style.title()}>
        <h6>{label}</h6>
        <button type="button" className={style.close()} onClick={() => removeNotice(id)}>
          <X />
        </button>
      </div>
      <p className={style.msg()}>{message}</p>
    </div>
  );
};

export default NoticeCard;
