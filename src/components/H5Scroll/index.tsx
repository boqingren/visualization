import React from "react";
import classnames from "classnames";
import MeScroll from "mescroll.js";
import { useScroll } from "../../hooks";
import { IScrollProps } from "../../types";
import "./index.css";

const H5Scroll: React.FC<IScrollProps> = React.memo(props => {
  const state = useScroll(props);

  console.log('H5Scroll state:', state)

  console.log("render h5 scroll components...");
  return (
    <div className="h5-scroll-components-container">
      {props.render(state)}
    </div>
  );
});

export default H5Scroll;