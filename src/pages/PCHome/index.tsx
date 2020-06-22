import React, { useState, useCallback, useMemo } from "react";
import "./index.css";

const PCHome = React.memo(() => {
  const [ count, setCount ] = useState(0);

  const handleClick = useCallback(() => {
    const result = count + 1;
    setCount(result);
  }, [ count ]);

  const countWidget = useMemo(() => (
    <section className="count-widget-container">
      <span className="count-widget-text badge badge-secondary">
        {count}
      </span>
      <button className="count-widget-btn btn btn-sm btn-info" onClick={handleClick}>
        increase
      </button>
    </section>
  ), [ count, handleClick ]);

  console.log("render pc home page...");
  
  return (
    <section className="pc-home-page-container">
      <h1 className="pc-home-title">
        PC Home Page.
      </h1>
      {countWidget}
    </section>
  );
});

export default PCHome;