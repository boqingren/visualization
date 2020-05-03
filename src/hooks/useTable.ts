import { useEffect, useReducer, useCallback } from "react";
import { useRequest } from "@umijs/hooks";
import { ITypes, ITableStore, TUseTableReducer, ITablePagination, TUseTable } from "../types";

const Types: ITypes = {
  SET_TABLE_LIST: "setTableList",
  SET_LIST_TOTAL: "setListTotal",
  CHANGE_PAGE: "changePage",
  SET_SUB_PAGES: "setSubPages"
};

const initStore: ITableStore = {
  tableList: [],
  pagination: {
    total: 0,
    pageNum: 1,
    pageSize: 10,
    subPages: []
  }
};

const reducer: TUseTableReducer = (state, action) => {	
  switch (action.type) {	
    case Types.SET_TABLE_LIST:
      return {
        ...state,
        tableList: action.payload
      };
    case Types.SET_LIST_TOTAL:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          total: action.payload
        }
      };
    case Types.CHANGE_PAGE: 
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pageNum: action.payload.pageNum,
          pageSize: action.payload.pageSize,
        }
      };
    case Types.SET_SUB_PAGES:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          subPages: [
            ...action.payload
          ]
        }
      };
    default: 
      throw new Error();
  }	
};

const getParams: (state: ITableStore, payload: ITablePagination) => ITablePagination = (state, payload) => ({
  pageNum: payload.pageNum || state.pagination.pageNum,
  pageSize: payload.pageSize || state.pagination.pageSize
});

const useTable: TUseTable = (httpRequest, payload = initStore.pagination) => {

  const params = getParams(initStore, payload);

  const [ state, dispatch ] = useReducer(reducer, {
    ...initStore,
    pagination: {
      ...initStore.pagination,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    }
  });

  const { loading, error, data } = useRequest(() => httpRequest({
    pageNum: state.pagination.pageNum,
    pageSize: state.pagination.pageSize
  }), {
    refreshDeps: [
      state.pagination.pageNum,
      state.pagination.pageSize
    ]
  });

  useEffect(() => {
    if (data) {
      const { pagination } = state
      const amount: number = data.total || 0;
      const size: number = pagination.pageSize || 0;
      const pageCount: number | never = Math.ceil(amount / size);
      dispatch({
        type: Types.SET_TABLE_LIST,
        payload: data.records
      });
      dispatch({
        type: Types.SET_LIST_TOTAL,
        payload: pageCount
      });
    }
  }, [ data, state.pagination.pageNum, state.pagination.pageSize, dispatch ]);

  const changePage = useCallback((payload: ITablePagination) => {
    const params = getParams(state, payload);
    dispatch({
      type: Types.CHANGE_PAGE,
      payload: {
        pageNum: params.pageNum,
        pageSize: params.pageSize
      }
    });
  }, [ state.pagination.pageNum, state.pagination.pageSize ]);

  const handleSetSubPages = useCallback(paginationSubs => {
    dispatch({
      type: Types.SET_SUB_PAGES,
      payload: paginationSubs
    });
  }, []);

  return {
    error,
    loading,
    state,
    changePage,
    setSubPages: handleSetSubPages
  };
};

export default useTable;