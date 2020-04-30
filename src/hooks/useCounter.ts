import { useEffect, useReducer, useCallback } from "react";
import { ICounterStore, TCounterReducer } from "../types";

const Types = {
  INCREASE_COUNT: "increaseCount",
  RESET_COUNT: "resetCount"
};

const initStore: ICounterStore = {
  count: 0
};

const reducer: TCounterReducer = (state, action) => {	
  switch (action.type) {	
    case Types.INCREASE_COUNT:
      return { count: state.count + action.payload };
    case Types.RESET_COUNT:
      return { count: 0 };
    default:	
      throw new Error();
  }	
};

const useCounter = (initState: ICounterStore = initStore) => {
  const [ state, dispatch ] = useReducer(reducer, initState);

  const increaseCount = useCallback((count: number = 1) => {
    dispatch({ type: Types.INCREASE_COUNT, payload: count });
  }, [ dispatch ]);

  const resetCount = useCallback(() => {
    dispatch({ type: Types.RESET_COUNT });
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