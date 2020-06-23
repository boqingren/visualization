import React from "react";
import { H5Scroll } from "../../components";
import { getPageData } from "../../services/H5MeScroll";
import { useScroll } from "../../hooks";
import "./index.css";

const H5MeScroll = React.memo(() => {
  console.log("render h5 mescroll page...");

  return (
    <div className="h5-mescroll-page-container">
      <H5Scroll
        getPageData={getPageData}
        render={store => {
          return (
            <div>

            </div>
          )
        }}
      />
    </div>
  );
});

export default H5MeScroll;