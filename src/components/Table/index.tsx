import React from "react";
import { ITableComponentProps } from "../../types";
import "./index.css";

const Table: React.FC<ITableComponentProps> = React.memo(props => {
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
    </section>
  );
});

export default Table;