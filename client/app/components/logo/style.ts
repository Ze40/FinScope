import { cva } from "~/styled-system/css";

export const logoImg = cva({
  base: {
    objectFit: "contain",
    aspectRatio: "1 / 1",
    width: {
      base: "60px",
    },
  },
});

export const logo = cva({
  base: {
    display: "flex",
    alignItems: "start",
    gap: "10px",
    fontSize: "xl",
    fontWeight: "800",
    padding: "3px",
    color: "primary",
  },
});
