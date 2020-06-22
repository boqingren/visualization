import React from "react";
import { H5Scroll } from "../../components";
import { getPageData } from "../../services/H5MeScroll";
import { useScroll } from "../../hooks";
import "./index.css";
import { render } from "@testing-library/react";

const H5MeScroll = React.memo(() => {
  console.log("render h5 mescroll page...");

  return (
    <div className="h5-mescroll-page-container">
      <H5Scroll getPageData={getPageData}>
        1231
      </H5Scroll>
    </div>
  );
});

export default H5MeScroll;