import React, { } from "react";
import { useCounter } from "../../hooks";
import "./index.css";

const Hooks = React.memo(() => {
  const { state, resetCount } = useCounter();
  console.log("render hooks page...");
  
  return (
    <section className="hooks-page-container">
      <h1 className="hooks-page-title" onClick={() => resetCount()}>
        Hooks Page.
      </h1>
      <div>{state.count}</div>
    </section>
  );
});

export default Hooks;