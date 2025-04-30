import { cva } from "~/styled-system/css";

export const btn = cva({
  base: {
    shadow: "around",
    width: "100%",
    padding: "10px 20px",
    borderRadius: "10px",
    bg: "white",
    transitionDuration: "0.2s",
    fontSize: "sm",
    _hover: {
      scale: "1.1",
      transitionDuration: "0.2s",
    },
  },
});
