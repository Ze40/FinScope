import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    display: "flex",
    padding: "30px 20px 0",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "start",
    gap: "30px",
    minHeight: "100vh",
    height: "100dvh",
    transition: "width 0.3s ease, padding 0.3s ease",
    overflowY: "auto",
    position: "relative",
  },
  variants: {
    open: {
      true: { width: "300px" },
      false: { width: "min-content", padding: "30px 10px 0" },
    },
  },
});

export const closeBtn = cva({
  base: {
    cursor: "pointer",
    alignSelf: "start",
    transition: "transform 0.2s ease, color 0.2s ease",
    color: "ghost",
    _hover: {
      color: "secondary",
      scale: "1.1",
    },
  },
  variants: {
    open: {
      true: {},
      false: { transform: "rotate(180deg)", alignSelf: "center" },
    },
  },
});

export const user = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: "12px",
    width: "100%",
  },
});

export const userImg = cva({
  base: {
    width: "150px",
    aspectRatio: "1",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "white",
    borderRadius: "full",
    overflow: "hidden",
    transition: "width 0.3s ease",
    flexShrink: 0,
  },
  variants: {
    open: {
      true: {},
      false: { width: "50px" },
    },
  },
});
export const list = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
});

export const pageCard = cva({
  base: {
    fontSize: "md",
    fontWeight: "500",
    color: "ghost",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    p: "8px 12px",
    borderRadius: "md",
    transition: "all 0.2s ease",
    _hover: {
      color: "secondary",
      bg: "main",
    },
  },
  variants: {
    active: {
      true: {
        color: "primary",
        bg: "main",
        fontWeight: "600",
      },
      false: {},
    },
  },
});
