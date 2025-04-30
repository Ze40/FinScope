"use client";

import { useState } from "react";

import { Bell } from "lucide-react";

import { useClickOutside } from "@/hooks/click";
import { useNoticeStore } from "@/stores/noticeStore";

import NoticeCard from "./notice-card/notice-card";
import * as style from "./style";

const Notice = () => {
  const [open, setOpen] = useState<boolean>(false);
  const toolsRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

  const notices = useNoticeStore((state) => state.notices);
  const count = useNoticeStore((state) => state.count);

  return (
    <div className={style.constainer()} ref={toolsRef}>
      <button type="button" className={style.notice()} onClick={() => setOpen(!open)}>
        <Bell size={30} />
        {count > 0 && <div className={style.noticeCount()}>{count}</div>}
      </button>
      {open && (
        <div className={style.noticeList()}>
          {count === 0
            ? "Уведомлений нет"
            : notices.map((notice) => (
                <div key={notice.id}>
                  <NoticeCard label={notice.label} message={notice.message} id={notice.id || -1} />
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Notice;
