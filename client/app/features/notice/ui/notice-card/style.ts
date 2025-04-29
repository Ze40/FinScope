import { cva } from "~/styled-system/css";

export const box = cva({
  base: {
    bg: "side",
    borderRadius: "5px",
    width: "300px",
  },
});

export const title = cva({
  base: {
    borderBottom: "1px solid white",
    padding: "10px 15px",
    fontSize: "sm",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "500",
  },
});

export const close = cva({
  base: {
    color: "primary",
    transitionDuration: "0.3s",
    padding: "5px",
    bg: "white",
    borderRadius: "full",
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    _hover: {
      scale: "1.1",
      transitionDuration: "0.3s",
    },
  },
});

export const msg = cva({
  base: {
    maxHeight: "100px",
    overflow: "auto",
    padding: "10px 15px",
    textWrap: "wrap",
    textAlign: "start",
  },
});
