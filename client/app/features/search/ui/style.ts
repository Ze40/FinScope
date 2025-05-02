import { cva } from "~/styled-system/css";

export const search = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "15px 20px",
    borderRadius: "full",
    fontSize: "sm",
    position: "relative",
    transitionDuration: "0.3s",
    fontWeight: "600",

    background: "white",
    width: {
      base: "500px",
    },

    _hover: {
      scale: 1.02,
      transitionDuration: "0.3s",
    },

    _focus: {
      color: "secondary",
      transitionDuration: "0.2s",
    },
  },
});

export const searchInput = cva({
  base: {
    width: "100%",
    outline: "none",
  },
});

export const resultBox = cva({
  base: {
    position: "absolute",
    bottom: "-10px",
    left: 0,
    maxHeight: "300px",
    translate: "auto",
    y: "100%",
    padding: "10px",
    bg: "white",
    borderRadius: "10px",
    shadow: "around",
    zIndex: 1000000,
  },
});

export const result = cva({
  base: {
    textWrap: "nowrap",
    padding: "10px",
    borderRadius: "5px",
    transitionDuration: "0.2s",
    cursor: "pointer",

    _hover: {
      bg: "side",
      transitionDuration: "0.2s",
    },
  },
});
