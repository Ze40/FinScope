import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
});
