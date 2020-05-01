import React from "react";
import { ITableProps } from "../../types";
import "./index.css";

const Table: React.FC<ITableProps> = React.memo(props => {
  const { columns, dataSource } = props;
  console.log("render table component...");
  return (
    <section className="table-component-container">
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
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
});

export default Table;