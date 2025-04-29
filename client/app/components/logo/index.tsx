import { Link } from "react-router";

import * as style from "./style";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className={style.logo()}>
        <img src="/shared/logo.png" alt="logo" className={style.logoImg()} />
        <h2>Fin Scope</h2>
      </div>
    </Link>
  );
};

export default Logo;
