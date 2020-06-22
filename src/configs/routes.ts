import React from "react";
import { IRoute } from "../types";

// 公共路由配置
export const COMMON_ROUTES_CONFIG: Array<IRoute> = [{
  path: "/home",
  text: "Home",
  isShow: true,
  isRoot: false,
  component: React.lazy(() => import("../pages/PCHome"))
}, {
  path: "/about",
  text: "About",
  isShow: true,
  isRoot: false,
  component: React.lazy(() => import("../pages/About"))
}, {
  path: "/hooks",
  text: "Hooks",
  isShow: true,
  isRoot: false,
  component: React.lazy(() => import("../pages/Hooks"))
}];

// PC 路由配置
export const PC_ROUTES_CONFIG: Array<IRoute> = [{
  path: "/",
  text: "PCHome",
  isShow: true,
  isRoot: true,
  component: React.lazy(() => import("../pages/PCHome"))
}];

// H5 路由配置
export const H5_ROUTES_CONFIG: Array<IRoute> = [{
  path: "/",
  text: "H5Home",
  isShow: false,
  isRoot: true,
  component: React.lazy(() => import("../pages/H5Home"))
}, {
  path: "/h5MeScroll",
  text: "H5MeScroll",
  isShow: true,
  isRoot: true,
  component: React.lazy(() => import("../pages/H5MeScroll"))
}];