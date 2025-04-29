import { cva } from "~/styled-system/css";

export const tableContainer = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    minH: "0",
    overflow: "auto",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
    rounded: "lg",
    shadow: "md",
    ring: "1",
    ringColor: "gray.200",
    bg: "white",
    scrollBehavior: "smooth",
  },
});

export const table = cva({
  base: {
    minW: "full",
    tableLayout: "auto",
    borderCollapse: "collapse",
  },
});

export const tableHeader = cva({
  base: {
    bg: "gray.50",
    position: "sticky",
    top: 0,
    fontSize: "sm",
    zIndex: "100",
  },
});

export const headerCell = cva({
  base: {
    px: "6",
    py: "3",
    textAlign: "left",
    textStyle: "xs",
    fontWeight: "medium",
    color: "gray.500",
    textTransform: "uppercase",
  },
});

export const tableRow = cva({
  base: {
    position: "relative",
    cursor: "pointer",
    transition: "colors 0.5s ease",
    _hover: {
      bg: "gray.50",
    },
  },
  variants: {
    choosen: {
      true: { background: "ghostLighter", _hover: { bg: "ghostLighter" } },
      false: {},
    },
  },
});

export const tableCell = cva({
  base: {
    px: "6",
    py: "4",
    whiteSpace: "nowrap",
    textStyle: "sm",
    color: "gray.900",
  },
  variants: {
    highlight: {
      true: {
        fontWeight: "semibold",
        color: "primary.600",
      },
    },
  },
});

export const emptyState = cva({
  base: {
    py: "8",
    textAlign: "center",
    color: "gray.500",
  },
});

export const tableBody = cva({
  base: {
    divideY: "1",
    divideColor: "gray.200",
  },
});

export const tableName = cva({
  base: {
    padding: "10px 0",
    fontSize: "md",
  },
});

export const dbTools = cva({
  base: {
    position: "absolute",
    top: "-10px",
    left: "10px",
    translate: "auto",
    y: "-100%",
    zIndex: "1000",
  },
});
