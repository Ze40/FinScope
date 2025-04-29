import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    fontFamily: "var(--font-rubik)",
    background: "side",
    padding: "0 40px",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
});

export const content = cva({
  base: {
    display: "flex",
    flex: 1,
    position: "relative",
    overflow: "hidden",
    padding: "0 0 30px",
  },
});

export const page = cva({
  base: {
    flex: 1,
    position: "relative",
    background: "main",
    height: "inherit",
    width: "100%",
    borderRadius: "main",
    overflow: "auto",
    padding: "30px",
  },
});
