
import { useEffect, useReducer, useCallback } from "react";
import { ITypes, IPaginationStore, TUsePagination, TUsePaginationReducer, ITablePagination } from "../types";

const Types: ITypes = {
  SET_PAGE_COUNT: "setPageCount",
  SET_PAGINATION_CURRENT: "setPaginationCurrent",
  SET_PAGINATION_LIST: "setPaginationList",
  SET_PAGINATION_SUBS: "setPaginationSubs",
  SET_CURRENT_SUBS: "setCurrentSubs",
  UPDATE_IS_FIRST_PAGE_NUM: "updateIsFirstPageNum",
  UPDATE_IS_LAST_PAGE_NUM: "updateIsLastPageNum",
  UPDATE_IS_SHOW_PRE_DOTS: "updateIsShowPreDots",
  UPDATE_IS_SHOW_NEXT_DOTS: "updateIsShowNextDots",
  UPDATE_IS_SHOW_PRE_BTN: "updateIsShowPreBtn",
  UPDATE_IS_SHOW_NEXT_BTN: "updateIsShowNextBtn"
};

const initStore: IPaginationStore = {
  pageCount: 0,
  current: 1,
  paginationList: [],
  paginationSubs: [],
  currentSubs: [],
  isFirstPageNum: false,
  isLastPageNum: false,
  isShowPreDots: false,
  isShowNextDots: false,
  isShowPreBtn: false,
  isShowNextBtn: false
};

const reducer: TUsePaginationReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_PAGE_COUNT: {
      return {
        ...state,
        pageCount: action.payload
      };
    };
    case Types.SET_PAGINATION_CURRENT: {
      return {
        ...state,
        current: action.payload
      };
    };
    case Types.SET_PAGINATION_LIST: {
      return {
        ...state,
        paginationList: [
          ...action.payload
        ]
      };
    };
    case Types.SET_PAGINATION_SUBS: {
      return {
        ...state,
        paginationSubs: [
          ...action.payload
        ]
      };
    };
    case Types.SET_CURRENT_SUBS: {
      return {
        ...state,
        currentSubs: [
          ...action.payload
        ]
      };
    };
    case Types.UPDATE_IS_FIRST_PAGE_NUM: {
      return {
        ...state,
        isFirstPageNum: !state.isFirstPageNum
      };
    };
    case Types.UPDATE_IS_LAST_PAGE_NUM: {
      return {
        ...state,
        isLastPageNum: !state.isLastPageNum
      };
    };
    case Types.UPDATE_IS_SHOW_PRE_DOTS: {
      return {
        ...state,
        isShowPreDots: !state.isShowPreDots
      };
    };
    case Types.UPDATE_IS_SHOW_NEXT_DOTS: {
      return {
        ...state,
        isShowNextDots: !state.isShowNextDots
      };
    };
    case Types.UPDATE_IS_SHOW_PRE_BTN: {
      return {
        ...state,
        isShowPreBtn: !state.isShowPreBtn
      };
    };
    case Types.UPDATE_IS_SHOW_NEXT_BTN: {
      return {
        ...state,
        isShowNextBtn: !state.isShowNextBtn
      };
    };
    default: {
      throw new Error();
    };
  }
};

const usePagination: TUsePagination = pagination => {
  const [ state, dispatch ] = useReducer(reducer, initStore);

  useEffect(() => {
    const amount: number = pagination.total || 0;
    const size: number = pagination.pageSize || 0;
    const pageCount: number | never = Math.ceil(amount / size);
    dispatch({
      type: Types.SET_PAGE_COUNT,
      payload: pageCount
    });
  }, [ pagination.total, pagination.pageSize ]);

  useEffect(() => {
    const { pageCount } = state;
    const paginationList: Array<number> = Array(pageCount).fill(1).map((item, index) => item + index);
    dispatch({
      type: Types.SET_PAGINATION_LIST,
      payload: paginationList
    });
  }, [ state.pageCount ]);

  const handlePreviousClick = useCallback(() => {
    if (isFirstPageNum) return;
    handlePageItemLinkClick(current - 1);
  }, [ current, isFirstPageNum ]);

  const handlePageItemLinkClick = useCallback(pageNum => {
    if (pageNum === current) return;
    setCurrent(pageNum);
    props.changePage({ pageNum });
  }, [current]);

  // useEffect(() => {
  //   const { pageCount } = state;
  //   const paginationList: Array<number> = Array(pageCount).fill(1).map((item, index) => item + index);
  //   dispatch({
  //     type: Types.SET_PAGINATION_LIST,
  //     payload: paginationList
  //   });
  // }, [ state.pageCount ]);

  return {
    state
  };
};

export default usePagination;