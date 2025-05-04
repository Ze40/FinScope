import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    display: "flex",
    gap: "20px",
    padding: "20px 10px",
  },
});

export const link = cva({
  base: {
    fontSize: "sm",
    fontWeight: "500",
    padding: "10px 15px",
    transitionDuration: "0.2s",
    borderRadius: "10px",

    _hover: {
      bg: "side",
      transitionDuration: "0.2s",
    },
  },
  variants: {
    active: {
      true: {
        bg: "gray.200",
      },
      false: {},
    },
  },
});
