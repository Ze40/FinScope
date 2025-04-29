import { cva } from "~/styled-system/css";

export const title = cva({
  base: {
    fontSize: "lg",
    color: "primary",
    fontWeight: 600,
    textTransform: "capitalize",
    lineHeight: 1,
  },
});

export const subTitle = cva({
  base: {
    fontSize: "subTitle",
    color: "secondary",
    fontWeight: 500,
    textTransform: "lowercase",
    lineHeight: "1",
  },
});

export const text = cva({
  base: {
    fontSize: "sm",
    color: "primary",
    fontWeight: 400,
    lineHeight: "1.1",
  },
});
