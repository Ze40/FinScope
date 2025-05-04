import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout("./routes/layout/main/index.tsx", [
    route("/", "./routes/pages/data/data.tsx"),
    layout("./routes/layout/handbook/index.tsx", [
      route("/handbook", "./routes/reroutes/handbook.tsx"),
      route("/handbook/goverment", "./routes/pages/handbook/goverment.tsx"),
      route("/handbook/regions", "./routes/pages/handbook/regions.tsx"),
      route("/handbook/cityes", "./routes/pages/handbook/citys.tsx"),
      route("/handbook/indicators", "./routes/pages/handbook/indicators.tsx"),
      route("/handbook/productions", "./routes/pages/handbook/productions.tsx"),
      route("/handbook/branch", "./routes/pages/handbook/branch.tsx"),
      route("/handbook/employee", "./routes/pages/handbook/employee.tsx"),
      route("/handbook/post", "./routes/pages/handbook/post.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
