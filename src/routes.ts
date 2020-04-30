import React from "react";
import { IRoute } from "./types";

const routes: Array<IRoute> = [{
  path: "/",
  text: "Home",
  isRoot: true,
  component: React.lazy(() => import("./pages/Home"))
}, {
  path: "/home",
  text: "Home",
  isRoot: false,
  component: React.lazy(() => import("./pages/Home"))
}, {
  path: "/about",
  text: "About",
  isRoot: false,
  component: React.lazy(() => import("./pages/About"))
}, {
  path: "/hooks",
  text: "Hooks",
  isRoot: false,
  component: React.lazy(() => import("./pages/Hooks"))
}, {
  path: "/table",
  text: "Table",
  isRoot: false,
  component: React.lazy(() => import("./pages/Table"))
}];

export default routes;