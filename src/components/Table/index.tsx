import React, { useCallback, useState } from "react";
import classnames from "classnames";
import { ITableProps } from "../../types";
import { ITablePagination } from "../../types";
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
  const paginationList = Array(pageCount).fill(1).map((item, index) => item + index);
  const [ current, setCurrent ] = useState(pagination.pageNum);

  const handlePageItemLinkClick = useCallback(pageNum => {
    if (pageNum === current) return;
    setCurrent(pageNum);
    props.changePage({ pageNum });
  }, [current]);

  const handlePreventDefault = useCallback(event => {
    event.preventDefault();
  }, []);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination table-pagination-container">
        <li className="page-item">
          <a className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {paginationList.map(item => (
          <li key={item} className={classnames(["page-item", { "active-page-item": item === current }])} onClick={() => handlePageItemLinkClick(item)}>
            <a className="page-link" onClick={handlePreventDefault}>
              {item}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" aria-label="Next" onClick={handlePreventDefault}>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
});

const TableList: React.FC<ITableProps> = React.memo(props => {
  const { columns, dataSource } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((item, index) => {
            const key = item.key || item.dataIndex || index;
            return <th key={key} scope="col">{item.title}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {dataSource.map((item, index) => (
          <tr key={index}>
            {Object.keys(item).map((child, idx) => {
              const key = columns[idx].dataIndex;
              const renderColumn = columns[idx].render;
              return <td key={key}>{renderColumn? renderColumn(item[key], item, index): item[key]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
});

const Table: React.FC<ITableProps> = React.memo(props => {
  console.log("render table component...");
  return (
    <section className="table-component-container">
      <TableList {...props} />
      <Pagination {...props} />
    </section>
  );
});

export default Table;