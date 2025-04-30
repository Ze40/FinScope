import { cva } from "~/styled-system/css";

export const box = cva({
  base: {
    position: "relative",
    padding: "10px 20px",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.3s ease",

    _hover: {
      scale: "1.1",
      transition: "all 0.3s ease",
    },
  },
});

export const chevron = cva({
  base: {
    transition: "transform 0.2s ease",
  },
  variants: {
    open: {
      true: { transform: "rotate(180deg)" },
      false: {},
    },
  },
});

export const check = cva({
  variants: {
    check: {
      true: { color: "primary" },
      false: { color: "side" },
    },
  },
});

export const list = cva({
  base: {
    position: "absolute",
    right: 0,
    bottom: 0,
    translate: "auto",
    y: "105%",
    background: "white",
    borderRadius: "10px",
    display: "flex",
    alignItems: "start",
    textAlign: "start",
    textWrap: "nowrap",
    flexDirection: "column",
    padding: "5px",
    zIndex: 1000,
    shadow: "around",
  },

  variants: {
    open: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
});

export const filterCard = cva({
  base: {
    width: "100%",
    padding: "10px 15px",
    fontSize: "sm",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    borderRadius: "5px",
    _hover: {
      background: "side",
      transition: "all 0.3s ease",
    },
  },
});
