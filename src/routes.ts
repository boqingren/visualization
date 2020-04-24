import React from "react";

export type routeComponent = React.LazyExoticComponent<React.MemoExoticComponent<() => JSX.Element>>;

export interface IRoute {
  readonly path: string;
  readonly text: string;
  readonly isRoot: boolean;
  readonly component: routeComponent;
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
}];

export default routes;