import React, { useState } from "react";
import Modal from "react-modal";
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

const PageListItem: React.FC<IH5MeScrollDataListItem> = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-item-container" key={props.userId}>
      <div className="h5-mescroll-page-list-item-account-container">
        <span>{props.userId}</span>
        <img src={editIcon} alt="" onClick={() => props.setIsShow!(true)} />
      </div>
      <div className="h5-mescroll-page-list-item-status-container">
        {props.valid? "生效": "無效"}
      </div>
      <div className="h5-mescroll-page-list-item-number-container">{props.teamCount}</div>
    </div>
  );
});

const PageList: React.FC<IH5MeScrollPageListProps> = React.memo(props => {
  return (
    <div className="h5-mescroll-page-list-container">
      <PageListHeader />
      {props.dataList.map(item => <PageListItem {...item} setIsShow={props.setIsShow} />)}
    </div>
  );
});

const EDIT_MODAL_OVERLAY_STYLE = {
  backgroundColor: "rgba(0, 0, 0, 0.45)"
};

const EDIT_MODAL_CONTENT_STYLE = {
  border: "0px",
  borderRadius: "4px",
  padding: "12px",
  top: "20%",
  bottom: "40%"
};

const EditModal: React.FC<any> = React.memo(props => {
  return (
    <Modal isOpen={props.isShow} role="dialog" style={{
      overlay: EDIT_MODAL_OVERLAY_STYLE,
      content: EDIT_MODAL_CONTENT_STYLE
    }}>
      <div className="h5-mescroll-edit-modal-button-container">
        <button className="h5-mescroll-edit-modal-cancel-btn" onClick={() => props.setIsShow(false)}>
          取消
        </button>
        <button className="h5-mescroll-edit-modal-confirm-btn">
          確定
        </button>
      </div>
    </Modal>
  )
})

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
      <EditModal
        isShow={isShow}
        setIsShow={setIsShow}
      />
    </H5WithHeader>
  );
});

export default H5MeScroll;