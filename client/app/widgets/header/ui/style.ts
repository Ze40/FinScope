import { cva } from "~/styled-system/css";

export const header = cva({
  base: {
    display: "flex",
    alignItems: "center",
    padding: "30px 0",
    justifyContent: "space-between",
  },
});
