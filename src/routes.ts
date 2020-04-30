import React from "react";

export interface IRoute {
  readonly path: string;
  readonly text: string;
  readonly isRoot: boolean;
  readonly component: any;
};

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
}];

export default routes;