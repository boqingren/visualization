import React from "react";
import classnames from "classnames";
import MeScroll from "mescroll.js";
import { useScroll } from "../../hooks";
import "./index.css";

const H5Scroll = React.memo(props => {
  console.log("render h5 scroll components...");
  return (
    <div className="h5-scroll-components-container">
      {props.children}
    </div>
  );
});

export default H5Scroll;