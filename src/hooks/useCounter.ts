import { useEffect, useReducer, useCallback } from "react";

const Types = {
  TICK: "tick",
  RESET: "reset"
};

const initStore = {
  count: 0
};

const reducer = (state: any, action: any) => {	
  switch (action.type) {	
    case Types.TICK:
      return { count: state.count + 1 };
    case Types.RESET:
      return { count: 0 };
    default:	
      throw new Error();
  }	
};

const useCounter = (initState: any = initStore) => {
  const [ state, dispatch ] = useReducer(reducer, initState);

  const tick = useCallback(() => {
    dispatch({ type: Types.TICK });
  }, [ dispatch ]);

  const reset = useCallback(() => {
    dispatch({ type: Types.RESET });
  }, [ dispatch ]);

  useEffect(() => {
    console.log("useEffect before return.");
    const timer = setInterval(() => {
      tick();
    }, 1000);
    return () => {
      console.log("useEffect return.");
      clearInterval(timer);
    };
  }, [ tick ]);

  return {
    state,
    reset,
    tick
  };
};

export default useCounter;