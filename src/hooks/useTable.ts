import { useEffect, useReducer, useCallback } from "react";
import { useRequest } from "@umijs/hooks";
import { ITypes } from "../types";

const Types: ITypes = {
  SET_TABLE_LIST: "setTableList",
  SET_LIST_TOTAL: "setListTotal",
  CHANGE_PAGE: "changePage"
};

const initStore = {
  tableList: [],
  pagination: {
    total: 0,
    pageNum: 1,
    pageSize: 10
  }
};

const reducer = (state: any, action: any) => {	
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
    default: 
      throw new Error();
  }	
};

const getParams = (state: any, payload: any) => ({
  pageNum: payload.pageNum || state.pagination.pageNum,
  pageSize: payload.pageSize || state.pagination.pageSize
});

const useTable = (httpRequest: any, payload: any = {}) => {

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
      dispatch({
        type: Types.SET_TABLE_LIST,
        payload: data.records
      });
      dispatch({
        type: Types.SET_LIST_TOTAL,
        payload: data.total
      });
    }
  }, [ data, state.pagination.pageNum, state.pagination.pageSize, dispatch ]);

  const changePage = useCallback((payload: any) => {
    dispatch({
      type: Types.CHANGE_PAGE,
      payload: {
        pageNum: payload.pageNum || state.pagination.pageNum,
        pageSize: payload.pageSize || state.pagination.pageSize
      }
    })
  }, [ state.pagination.pageNum, state.pagination.pageSize ]);

  return {
    error,
    loading,
    state,
    changePage
  };
};


export default useTable;