import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { usePagination } from "../../hooks";
import { ITableProps, ITablePagination } from "../../types";
import "./index.css";



const Pagination: React.FC<ITableProps> = React.memo(props => {
  const {
    state,
    handlePageItemLinkClick,
    handlePreBtnClick,
    handleNextBtnClick
  } = usePagination(props);

  console.log("Pagination state:", state);

  const handlePreventDefault = useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination table-pagination-container">
        {state.isShowPreBtn && (
          <li className="page-item" onClick={handlePreBtnClick}>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        {state.paginationList.map(item => (
          <li key={item} className={classnames(["page-item", { "active-page-item": item === state.current }])} onClick={() => handlePageItemLinkClick(item)}>
            <a className="page-link" onClick={handlePreventDefault}>
              {item}
            </a>
          </li>
        ))}
        {state.isShowNextBtn && (
          <li className="page-item">
            <a className="page-link" aria-label="Next" onClick={handlePreventDefault}>
              <span aria-hidden="true">...</span>
            </a>
          </li>
        )}
        {state.isShowNextBtn && (
          <li className="page-item" onClick={handleNextBtnClick}>
            <a className="page-link" aria-label="Next" onClick={handlePreventDefault}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
});

export default Pagination;