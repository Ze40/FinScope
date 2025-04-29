import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "relative",
  },
});
