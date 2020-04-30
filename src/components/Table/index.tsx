import React from "react";
import "./index.css";

const Table = React.memo(() => {
  console.log("render table component...");
  
  return (
    <section className="table-component-container">
      <h1 className="table-component-title">
        Table Component.
      </h1>
    </section>
  );
});

export default Table;