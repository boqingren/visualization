import React from "react";

const DataLoading = React.memo(() => {

  console.log("render dataLoading components...");

  return (
    <div className="loading-loading-components-container">
      Data is loading...
    </div>
  );
});

export default DataLoading;