import React from "react";
import classnames from "classnames";
import { usePagination } from "../../hooks";
import { ITableProps, IPageLinksProps, IRestBtnProps } from "../../types";
import "./index.css";


const handlePreventDefault: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void = event => event.preventDefault();

const CurrentSubs: React.FC<IPageLinksProps> = React.memo(props => (
  <>
    {props.paginationSubs.map(item => (
      <li key={item} className={classnames(["page-item", { "active-page-item": item === props.current }])} onClick={() => props.handleClick(item)}>
        <a className="page-link" onClick={handlePreventDefault}>
          {item}
        </a>
      </li>
    ))}
  </>
));

const PreDots: React.FC<IRestBtnProps> = React.memo(props => !props.isShow? null: (
  <li className="page-item" onClick={props.handleClick}>
    <a className="page-link" aria-label="Previous" onClick={handlePreventDefault}>
      <span aria-hidden="true">...</span>
    </a>
  </li>
));

const NextDots: React.FC<IRestBtnProps> = React.memo(props => !props.isShow? null: (
  <li className="page-item" onClick={props.handleClick}>
    <a className="page-link" aria-label="Next" onClick={handlePreventDefault}>
      <span aria-hidden="true">...</span>
    </a>
  </li>
));

const PreBtn: React.FC<IRestBtnProps> = React.memo(props => !props.isShow? null: (
  <li className="page-item" onClick={props.handleClick}>
    <a className="page-link" aria-label="Previous" onClick={handlePreventDefault}>
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
));

const NextBtn: React.FC<IRestBtnProps> = React.memo(props => !props.isShow? null: (
  <li className="page-item" onClick={props.handleClick}>
    <a className="page-link" aria-label="Next" onClick={handlePreventDefault}>
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
));

const JumpInputGroup: React.FC<any> = React.memo(props => {
  return (
    <div className="input-group mb-3">
      <input type="text" className="form-control" aria-label="Amount (to the nearest dollar)" />
      <div className="input-group-append">
        <span className="input-group-text">Go</span>
      </div>
    </div>
  );
});

const Pagination: React.FC<ITableProps> = React.memo(props => {
  const { state, handlePageItemLinkClick, handlePreDotsClick, handleNextDotsClick, handlePreBtnClick, handleNextBtnClick } = usePagination(props);
  console.log("Pagination state:", state);

  return (
    <nav className="navigation-navigation-wrapper" aria-label="navigation navigation wrapper">
      <ul className="pagination table-pagination-container">
        <PreBtn isShow={state.isShowPreBtn} handleClick={handlePreBtnClick} />
        <PreDots isShow={state.isShowPreDots} handleClick={handlePreDotsClick} />
        <CurrentSubs current={state.current} paginationSubs={state.paginationSubs} handleClick={handlePageItemLinkClick} />
        <NextDots isShow={state.isShowNextDots} handleClick={handleNextDotsClick} />
        <NextBtn isShow={state.isShowNextBtn} handleClick={handleNextBtnClick} />
      </ul>
      <JumpInputGroup />
    </nav>
  );
});

export default Pagination;