import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/layout/main/index.tsx", [route("/", "./routes/data.tsx")]),
] satisfies RouteConfig;
