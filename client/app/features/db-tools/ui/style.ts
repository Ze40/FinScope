import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
});

export const modalOverlay = cva({
  base: {
    bg: "rgba(0,0,0,0.4)",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export const modal = cva({
  base: {
    bg: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
