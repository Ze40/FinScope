import { Logo } from "@/components";
import { Search } from "@/features";

import * as style from "./style";

const Header = () => {
  return (
    <header className={style.header()}>
      <Logo />
      <Search />
      {/* <Notice /> */}
    </header>
  );
};

export default Header;
