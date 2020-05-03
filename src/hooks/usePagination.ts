
import { useEffect, useReducer, useCallback } from "react";
import { ITypes, IPaginationStore, TUsePagination, TUsePaginationReducer, ITablePagination } from "../types";
import { type } from "os";

const Types: ITypes = {
  SET_PAGE_COUNT: "setPageCount",
  SET_PAGINATION_CURRENT: "setPaginationCurrent",
  SET_PAGINATION_LIST: "setPaginationList",
  SET_PAGINATION_SUBS: "setPaginationSubs",
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

const usePagination: TUsePagination = ({ pagination, changePage, setSubPages }) => {
  const [ state, dispatch ] = useReducer(reducer, {
    ...initStore,
    pageCount: pagination.total,
    current: pagination.pageNum,
    paginationSubs: pagination.subPages as Array<number>
  });

  const handleShowNextDots = useCallback(() => {
    
  }, [ state.paginationList ]);

  useEffect(() => {
    dispatch({
      type: Types.SET_PAGE_COUNT,
      payload: pagination.total
    });
  }, [ pagination.total ]);

  useEffect(() => {
    const paginationList: Array<number> = Array(state.pageCount).fill(1).map((item, index) => item + index);
    const isOverflow7 = paginationList.length > 7;
    const paginationSubs = isOverflow7? paginationList.slice(0, 7): paginationList;
    const isSetSubs = state.paginationSubs.length === 0;
    dispatch({
      type: Types.SET_PAGINATION_LIST,
      payload: paginationList
    });
    dispatch({
      type: Types.SET_PAGINATION_SUBS,
      payload: isSetSubs? paginationSubs: state.paginationSubs
    });
  }, [ state.pageCount, state.paginationSubs[0], state.paginationSubs[state.paginationSubs.length - 1] ]);

  useEffect(() => {
    const { paginationSubs } = state;
    const distance = paginationSubs[paginationSubs.length - 1] - 1;
    const isShowPreDots = distance >= 7;
    dispatch({
      type: Types.UPDATE_IS_SHOW_PRE_DOTS,
      payload: isShowPreDots
    });
  }, [ state.paginationSubs[state.paginationSubs.length - 1] ]);

  useEffect(() => {
    const { pageCount, paginationSubs } = state;
    const distance = (pageCount || 0) - paginationSubs[paginationSubs.length - 1];
    const isShowNextDots = distance > 0;
    dispatch({
      type: Types.UPDATE_IS_SHOW_NEXT_DOTS,
      payload: isShowNextDots
    });
  }, [ state.pageCount, state.paginationSubs[state.paginationSubs.length - 1] ]);

  useEffect(() => {
    const { current, paginationList } = state;
    const isFirstPageNum = current === paginationList[0];
    dispatch({
      type: Types.UPDATE_IS_FIRST_PAGE_NUM,
      payload: isFirstPageNum
    });
    dispatch({
      type: Types.UPDATE_IS_SHOW_PRE_BTN,
      payload: !isFirstPageNum
    });
  }, [ state.current, state.paginationList[0] ]);

  useEffect(() => {
    const { current, paginationList } = state;
    const isLastPageNum = current === paginationList[paginationList.length - 1];
    dispatch({
      type: Types.UPDATE_IS_LAST_PAGE_NUM,
      payload: isLastPageNum
    });
    dispatch({
      type: Types.UPDATE_IS_SHOW_NEXT_BTN,
      payload: !isLastPageNum
    });
  }, [ state.current, state.paginationList[state.paginationList.length - 1] ]);

  const handlePageItemLinkClick = useCallback(pageNum => {
    if (pageNum === state.current) return;
    changePage({ pageNum });
    dispatch({
      type: Types.SET_PAGINATION_CURRENT,
      payload: pageNum
    });
  }, [ state.current ]);

  const handlePreDotsClick = useCallback(() => {
    // const isShowPreDots = sliceLength > 0;
    // dispatch({
    //   type: Types.UPDATE_IS_SHOW_PRE_DOTS,
    //   payload: isShowPreDots
    // });

    // if (sliceLength <= 0) return;
    // const subSlices = paginationSubs.slice(0, -sliceLength);
    // const preSubs = Array(sliceLength).fill(0).map((item, index) => paginationList[0] - index - 1).reverse().filter(item => item !== undefined);
    // const newSubs = ([] as Array<number>).concat(subSlices, preSubs);
    // dispatch({
    //   type: Types.SET_PAGINATION_SUBS,
    //   payload: newSubs
    // });
  }, []);

  const handleNextDotsClick = useCallback(() => {

  }, []);

  const handlePreBtnClick = useCallback(() => {
    const { current, isFirstPageNum, paginationSubs } = state;
    if (isFirstPageNum || !current) return;
    handlePageItemLinkClick(current - 1);
    if ((current as number) === paginationSubs[0]) {
      const newSubs = ([] as Array<number>).concat(current - 1, paginationSubs.slice(0, -1));
      setSubPages(newSubs);
    }
  }, [ state.current, state.isFirstPageNum, state.paginationSubs[0] ]);

  const handleNextBtnClick = useCallback(() => {
    const { current, isLastPageNum, paginationSubs } = state;
    if (isLastPageNum || !current) return;
    handlePageItemLinkClick(current + 1);
    if ((current as number) === paginationSubs[paginationSubs.length - 1]) {
      const newSubs = ([] as Array<number>).concat(paginationSubs.slice(1), current + 1);
      setSubPages(newSubs);
    }
  }, [ state.current, state.isLastPageNum, state.paginationSubs[state.paginationSubs.length - 1] ]);

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