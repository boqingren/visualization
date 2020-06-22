import { baseUrl } from './../configs/http';
import React from "react";
import { useMedia } from "react-media";
import { IRoute } from "../types";

const useRoutesWithMedia: () => Array<IRoute> = () => {
  const isSmallScreen = useMedia({ query: "(max-width: 599px)" });
  return [{
    path: "/",
    text: isSmallScreen? "H5Home": "Home",
    isShow: isSmallScreen? false: true,
    isRoot: true,
    component: React.lazy(() => import(`../pages/${isSmallScreen? "H5Home": "Home"}`))
  }, {
    path: "/home",
    text: "Home",
    isShow: true,
    isRoot: false,
    component: React.lazy(() => import("../pages/Home"))
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
};

export default useRoutesWithMedia;