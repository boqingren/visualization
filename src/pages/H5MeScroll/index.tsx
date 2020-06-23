import React, { useState } from "react";
import ReactModal from "react-modal";
import { H5Scroll, H5Header, H5WithHeader } from "../../components";
import { getPageData } from "../../services/H5MeScroll";
import { useScroll } from "../../hooks";
import editIcon from "../../images/edit.png";
import { IUseScrollResult, IH5MeScrollPageListProps, IH5MeScrollDataListItem } from "../../types";
import dataList from "./dataList";
import "./index.css";

const PageListHeader = React.memo(() => {
  return (
    <div className="h5-mescroll-page-list-header-container">
      <div className="h5-mescroll-page-list-header-account-container">好友賬號</div>
      <div className="h5-mescroll-page-list-header-status-container">狀態</div>
      <div className="h5-mescroll-page-list-header-number-container">有效人數</div>
    </div>
  );
});

const PageListItem: React.FC<{ item: IH5MeScrollDataListItem }> = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-item-container" key={props.item.userId}>
      <div className="h5-mescroll-page-list-item-account-container">
        <span>{props.item.userId}</span>
        <img src={editIcon} alt="" />
      </div>
      <div className="h5-mescroll-page-list-item-status-container">
        {props.item.valid? "生效": "無效"}
      </div>
      <div className="h5-mescroll-page-list-item-number-container">{props.item.teamCount}</div>
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
  const [ isShow, setIsShow ] = useState(false);
  const [ current, setCurrent ] = useState({} as IH5MeScrollDataListItem);

  console.log("render h5 mescroll page...");

  return (
    <H5WithHeader title="我的推薦">
      <H5Scroll getPageData={getPageData} render={store => (
        <PageList
          store={store}
          dataList={dataList}
          isShow={isShow}
          current={current}
          setIsShow={setIsShow}
          setCurrent={setCurrent}
        />
      )}/>
    </H5WithHeader>
  );
});

export default H5MeScroll;