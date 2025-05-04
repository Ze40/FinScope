import { Outlet } from "react-router";
import { css } from "~/styled-system/css";

import { DataSearch, HandbookNav } from "@/widgets";

const HandbookLayout = () => {
  return (
    <>
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          height: "100%",
          position: "relative",
        })}
      >
        <DataSearch className={css({ marginBottom: "30px" })} />
        <HandbookNav />
        <Outlet />
      </div>
    </>
  );
};

export default HandbookLayout;
