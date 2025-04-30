import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    textAlign: "start",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    gap: "5px",
  },
});

export const input = cva({
  base: {
    bg: "main",
    outline: "none",
    borderRadius: "10px",
    padding: "10px 15px",
    transitionDuration: "0.2s",
    _hover: {
      transitionDuration: "0.2s",
      scale: "1.03",
    },
  },
});

export const label = cva({
  base: {
    fontSize: "sm",
    textTransform: "capitalize",
    color: "secondary",
    fontWeight: "500",
  },
});
