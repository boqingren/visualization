import { useEffect, useReducer, useCallback } from "react";

const Types = {
  INCREASE: "increaseCount",
  RESET: "resetCount"
};

const initStore = {
  count: 0
};

const reducer = (state: any, action: any) => {	
  switch (action.type) {	
    case Types.INCREASE:
      return { count: state.count + action.count };
    case Types.RESET:
      return { count: 0 };
    default:	
      throw new Error();
  }	
};

const useCounter = (initState: any = initStore) => {
  const [ state, dispatch ] = useReducer(reducer, initState);

  const increaseCount = useCallback((count: number = 1) => {
    dispatch({ type: Types.INCREASE, count });
  }, [ dispatch ]);

  const resetCount = useCallback(() => {
    dispatch({ type: Types.RESET });
  }, [ dispatch ]);

  useEffect(() => {
    console.log("useEffect before return.");
    const timer = setInterval(() => {
      increaseCount();
    }, 1000);
    return () => {
      console.log("useEffect return.");
      clearInterval(timer);
    };
  }, [ increaseCount ]);

  return {
    state,
    increaseCount,
    resetCount
  };
};

export default useCounter;