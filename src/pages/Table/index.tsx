import React from "react";
import { useTable } from "../../hooks";
import "./index.css";

const Table = React.memo(() => {
  // const { } = useTable();
  console.log("render table page...");
  
  return (
    <section className="table-page-container">
      <h1 className="table-page-title">
        Table Page.
      </h1>
    </section>
  );
});

export default Table;