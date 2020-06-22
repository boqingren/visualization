import React from "react";
import { H5Scroll } from "../../components";
import "./index.css";

const H5MeScroll = React.memo(() => {
  console.log("render h5 mescroll page...");

  return (
    <div className="h5-mescroll-page-container">
      <H5Scroll>
        1231
      </H5Scroll>
    </div>
  );
});

export default H5MeScroll;