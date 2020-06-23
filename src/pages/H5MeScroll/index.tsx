import React from "react";
import { H5Scroll } from "../../components";
import { getPageData } from "../../services/H5MeScroll";
import { useScroll } from "../../hooks";
import { IUseScrollResult, IH5MeScrollPageListProps, IH5MeScrollDataListItem } from "../../types";
import dataList from "./dataList";
import "./index.css";

const PageListItem: React.FC<{ item: IH5MeScrollDataListItem }> = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-item-container">
      <div className="h5-mescroll-page-list-item-account-container">{props.item.userId}</div>
      <div className="h5-mescroll-page-list-item-status-container">{props.item.valid}</div>
      <div className="h5-mescroll-page-list-item-number-container">{props.item.teamCount}</div>
    </div>
  );
});

const PageListHeader = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-header-container">
      <div className="h5-mescroll-page-list-header-account-container">好友账号</div>
      <div className="h5-mescroll-page-list-header-status-container">状态</div>
      <div className="h5-mescroll-page-list-header-number-container">有效人数</div>
    </div>
  );
});

const PageList: React.FC<IH5MeScrollPageListProps> = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-container">
      <PageListHeader />
      {props.dataList.map(item => <PageListItem item={item} />)}
    </div>
  );
});

const H5MeScroll = React.memo(() => {
  console.log("render h5 mescroll page...");

  return (
    <div className="h5-mescroll-page-container">
      <H5Scroll
        getPageData={getPageData}
        render={store => <PageList dataList={dataList} />}
      />
    </div>
  );
});

export default H5MeScroll;