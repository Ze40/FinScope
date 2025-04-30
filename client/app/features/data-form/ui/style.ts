import { cva } from "~/styled-system/css";

export const form = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    alignItems: "center",
    bg: "white",
    padding: "40px",
    borderRadius: "20px",
  },
});

export const inputContainer = cva({
  base: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "auto",
    gap: "15px",
  },
});
