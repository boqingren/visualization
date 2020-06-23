import React from "react";
import { H5Scroll } from "../../components";
import { getPageData } from "../../services/H5MeScroll";
import { useScroll } from "../../hooks";
import { IUseScrollResult } from "../../types";
import "./index.css";

const PageListItem = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-item-container">
      131
    </div>
  );
});

const PageList: React.FC<{ store: IUseScrollResult }> = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-container">
      
    </div>
  );
});

const H5MeScroll = React.memo(() => {
  console.log("render h5 mescroll page...");

  return (
    <div className="h5-mescroll-page-container">
      <H5Scroll
        getPageData={getPageData}
        render={store => <PageList store={store} />}
      />
    </div>
  );
});

export default H5MeScroll;