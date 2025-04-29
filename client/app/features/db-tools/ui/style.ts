import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    background: "white",
    shadow: "around",
    padding: "10px",
    borderRadius: "10px",
    position: "relative",
  },
});

export const btn = cva({
  base: {
    width: "100%",
    padding: "10px 10px",
    borderRadius: "5px",
    transitionDuration: "0.2s",
    _hover: {
      bg: "side",
      transitionDuration: "0.2s",
    },
  },
});
