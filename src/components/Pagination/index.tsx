import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { ITableProps, ITablePagination } from "../../types";
import "./index.css";

const getPageCount: (pagination: ITablePagination) => number = pagination => {
  const amount: number = pagination.total || 0;
  const size: number = pagination.pageSize || 0;
  const pageCount = Math.ceil(amount / size);
  return pageCount;
};

const Pagination: React.FC<ITableProps> = React.memo(props => {
  const { pagination } = props;
  const pageCount = getPageCount(pagination);
  const paginationList: Array<number> = Array(pageCount).fill(1).map((item, index) => item + index);
  const isShowEllipsis = paginationList.length > 7;
  const paginationSubArr = isShowEllipsis? paginationList.slice(0, 7): paginationList;
  const [ current, setCurrent ] = useState(pagination.pageNum);
  const [ paginationSubs, setPaginationSubs ] = useState(paginationSubArr);
  const isFirstPageNum = current === paginationList[0];
  const isLastPageNum = current === paginationList[paginationList.length - 1];
  const isShowPrevious = !isFirstPageNum;
  const isShowNext = !isLastPageNum;

  console.log("paginationSubs:", paginationSubs);
  console.log("paginationSubArr:", paginationSubArr);

  const handlePreviousClick = useCallback(() => {
    if (isFirstPageNum) return;
    handlePageItemLinkClick(current - 1);
  }, [ current, isFirstPageNum ]);

  const handlePageItemLinkClick = useCallback(pageNum => {
    if (pageNum === current) return;
    setCurrent(pageNum);
    props.changePage({ pageNum });
  }, [current]);

  const handleEllipsisClick = useCallback(() => {
    // paginationSubs
  }, []);

  const handleNextClick = useCallback(() => {
    if (isLastPageNum) return;
    handlePageItemLinkClick(current + 1);
  }, [ current, isLastPageNum ]);

  const handlePreventDefault = useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination table-pagination-container">
        {isShowPrevious && (
          <li className="page-item" onClick={handlePreviousClick}>
            <a className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
        )}
        {paginationSubArr.map(item => (
          <li key={item} className={classnames(["page-item", { "active-page-item": item === current }])} onClick={() => handlePageItemLinkClick(item)}>
            <a className="page-link" onClick={handlePreventDefault}>
              {item}
            </a>
          </li>
        ))}
        {isShowEllipsis && (
          <li className="page-item">
            <a className="page-link" aria-label="Next" onClick={handlePreventDefault}>
              <span aria-hidden="true">...</span>
            </a>
          </li>
        )}
        {isShowNext && (
          <li className="page-item" onClick={handleNextClick}>
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