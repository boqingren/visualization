import React, { useState, useCallback, useMemo } from "react";
import "./index.css";

const Home = React.memo(() => {
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

  console.log("render home page...");
  
  return (
    <section className="home-page-container">
      <h1 className="home-page-title">
        Home Page.
      </h1>
      {countWidget}
    </section>
  );
});

export default Home;