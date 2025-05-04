import { NavLink } from "react-router";

import { handbookList } from "../modal/hanbook-list";
import * as style from "./style";

const HandbookNav = () => {
  return (
    <ul className={style.container()}>
      {handbookList.map((book) => (
        <li key={book.id}>
          <NavLink to={book.href} className={({ isActive }) => style.link({ active: isActive })}>
            {book.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default HandbookNav;
