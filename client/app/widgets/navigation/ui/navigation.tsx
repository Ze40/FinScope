"use client";

import { useState } from "react";

import { PanelRightOpen, User } from "lucide-react";
import { NavLink } from "react-router";

import { subTitle, title } from "@/styles/reciepts/font";

import { pageList } from "../model/list";
import * as style from "./style";

const Navigation = () => {
  const [open, setOpen] = useState<boolean>(true);

  return (
    <nav className={style.container({ open })}>
      <button type="button" className={style.closeBtn({ open })} onClick={() => setOpen(!open)}>
        <PanelRightOpen size={40} />
      </button>
      <div className={style.user()}>
        <div className={style.userImg({ open })}>
          <User size={open ? 80 : 40} />
        </div>
        {open && (
          <div className="">
            <h4 className={title()}>user</h4>
            <p className={subTitle()}>post</p>
          </div>
        )}
      </div>
      <ul className={style.list()}>
        {pageList.map((page) => (
          <li key={page.id}>
            <NavLink
              to={page.href}
              className={({ isActive }) => style.pageCard({ active: isActive })}
            >
              <page.icon size={open ? 30 : 40} />
              {open && page.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
