import { Logo } from "@/components";
import { Notice } from "@/features";

import * as style from "./style";

const Header = () => {
  return (
    <header className={style.header()}>
      <Logo />

      <Notice />
    </header>
  );
};

export default Header;
