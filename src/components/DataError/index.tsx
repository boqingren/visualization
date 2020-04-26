import React from "react";

const DataError = React.memo(() => {

  console.log("render dataError components...");

  return (
    <div className="data-error-components-container">
      Something is error ...
    </div>
  );
});

export default DataError;