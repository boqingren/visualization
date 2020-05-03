
import { useEffect, useReducer, useCallback } from "react";
import { ITypes, IPaginationStore, TUsePagination, TUsePaginationReducer, ITablePagination } from "../types";
import { type } from "os";

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
        isFirstPageNum: action.payload
      };
    };
    case Types.UPDATE_IS_LAST_PAGE_NUM: {
      return {
        ...state,
        isLastPageNum: action.payload
      };
    };
    case Types.UPDATE_IS_SHOW_PRE_DOTS: {
      return {
        ...state,
        isShowPreDots: action.payload
      };
    };
    case Types.UPDATE_IS_SHOW_NEXT_DOTS: {
      return {
        ...state,
        isShowNextDots: action.payload
      };
    };
    case Types.UPDATE_IS_SHOW_PRE_BTN: {
      return {
        ...state,
        isShowPreBtn: action.payload
      };
    };
    case Types.UPDATE_IS_SHOW_NEXT_BTN: {
      return {
        ...state,
        isShowNextBtn: action.payload
      };
    };
    default: {
      throw new Error();
    };
  }
};

const usePagination: TUsePagination = ({ pagination, changePage }) => {
  const [ state, dispatch ] = useReducer(reducer, {
    ...initStore,
    pageCount: pagination.total,
    current: pagination.pageNum
  });

  const handleShowPreDots = useCallback(() => {

  }, [ state.paginationList, state.paginationSubs ]);

  const handleShowNextDots = useCallback(() => {

  }, [ state.paginationList, state.paginationSubs ]);

  const handleShowPreBtn = useCallback(() => {
    const { current, paginationList } = state;
    const isFirstPageNum = current === paginationList[0];
    debugger;
    dispatch({
      type: Types.UPDATE_IS_FIRST_PAGE_NUM,
      payload: isFirstPageNum
    });
    dispatch({
      type: Types.UPDATE_IS_SHOW_PRE_BTN,
      payload: !isFirstPageNum
    });
  }, [ state.current, state.paginationList[0] ]);

  const handleShowNextBtn = useCallback(() => {
    const { current, paginationList } = state;
    const isLastPageNum = current === paginationList[paginationList.length - 1];
    debugger;
    dispatch({
      type: Types.UPDATE_IS_LAST_PAGE_NUM,
      payload: isLastPageNum
    });
    dispatch({
      type: Types.UPDATE_IS_SHOW_NEXT_BTN,
      payload: !isLastPageNum
    });
  }, [ state.current, state.paginationList[state.paginationList.length - 1] ]);

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
    const { pageCount, current } = state;
    const paginationList: Array<number> = Array(pageCount).fill(1).map((item, index) => item + index);
    const isOverflow7 = paginationList.length > 7;
    const paginationSubs = isOverflow7? paginationList.slice(0, 7): paginationList;
    debugger;
    dispatch({
      type: Types.SET_PAGINATION_LIST,
      payload: paginationList
    });
    dispatch({
      type: Types.SET_PAGINATION_SUBS,
      payload: paginationSubs
    });
    handleShowPreBtn();
    handleShowNextBtn();
  }, [ state.pageCount, handleShowPreBtn, handleShowNextBtn ]);

  const handlePageItemLinkClick = useCallback(pageNum => {
    if (pageNum === state.current) return;
    changePage({ pageNum });
    dispatch({
      type: Types.SET_PAGINATION_CURRENT,
      payload: pageNum
    });
  }, [ state.current ]);

  const handlePreDotsClick = useCallback(() => {

  }, []);

  const handleNextDotsClick = useCallback(() => {

  }, []);

  const handlePreBtnClick = useCallback(() => {
    if (state.isFirstPageNum || !state.current) return;
    handlePageItemLinkClick(state.current - 1);
  }, [ state.current, state.isFirstPageNum ]);

  const handleNextBtnClick = useCallback(() => {
    if (state.isLastPageNum || !state.current) return;
    handlePageItemLinkClick(state.current + 1);
  }, [ state.current, state.isLastPageNum ]);

  return {
    state,
    handlePageItemLinkClick,
    handlePreDotsClick,
    handleNextDotsClick,
    handlePreBtnClick,
    handleNextBtnClick
  };
};

export default usePagination;