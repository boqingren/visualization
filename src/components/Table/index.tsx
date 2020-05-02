import React from "react";
import Pagination from "../Pagination";
import { ITableProps } from "../../types";
import "./index.css";

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