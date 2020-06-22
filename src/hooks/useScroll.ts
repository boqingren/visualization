import { useEffect, useReducer, useCallback } from "react";
import { ITypes, IScrollStore, TUseScrollReducer, TUseScroll } from "../types";

const Types: ITypes = {
  SET_MESCROLL_ID: "setMescrollId",
  SET_MESCROLL_INSTANCE: "setMescrollInstance",
  SET_PAGE_NUM: "setPageNum",
  SET_PAGE_SIZE: "setPageSize"
};

const initStore: IScrollStore = {
  mescrollId: null,
  mescroll: null,
  pageNum: 0,
  pageSize: 10
};

const reducer: TUseScrollReducer = (state, action) => {	
  switch (action.type) {	
    case Types.SET_MESCROLL_ID:
      return {
        ...state,
        mescrollId: action.payload
      };
    case Types.SET_MESCROLL_INSTANCE:
      return {
        ...state,
        mescroll: action.payload
      };
    case Types.SET_PAGE_NUM: 
      return {
        ...state,
        pageNum: action.payload
      };
    case Types.SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload
      };
    default: 
      throw new Error();
  }	
};

const useScroll: TUseScroll = params => {
  return {
    pageNum: 0,
    pageSize: 10,
    isDown: true,
    isUp: false,
    mescroll: {}
  };
};

export default useScroll;