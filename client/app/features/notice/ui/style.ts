import { cva } from "~/styled-system/css";

export const constainer = cva({
  base: {
    position: "relative",
  },
});

export const notice = cva({
  base: {
    position: "relative",
    borderRadius: "full",
    background: "white",
    padding: "15px",
    transitionDuration: "0.3s",
    cursor: "pointer",
    _hover: {
      scale: "1.1",
      transitionDuration: "0.3s",
      color: "secondary",
    },
  },
});

export const noticeCount = cva({
  base: {
    position: "absolute",
    width: "20px",
    height: "20px",
    textAlign: "center",
    lineHeight: 1,
    bg: "ghost",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    right: 0,
    borderRadius: "full",
  },
});

export const noticeList = cva({
  base: {
    position: "absolute",
    bg: "white",
    shadow: "around",
    padding: "10px",
    borderRadius: "10px",
    zIndex: 100,
    bottom: "-10px",
    right: 0,
    translate: "auto",
    y: "100%",
    textWrap: "nowrap",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxHeight: "500px",
    overflowY: "scroll",
    scrollbar: "hidden",
  },
});
