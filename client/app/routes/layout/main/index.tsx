import { Outlet } from "react-router";

import { Header, Navigation } from "@/widgets";

import * as style from "./style";

const MainLayout = () => {
  return (
    <div className={style.container()}>
      <Header />
      <div className={style.content()}>
        <Navigation />
        <main className={style.page()}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
