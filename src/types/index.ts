export interface IRoute {
  readonly path: string;
  readonly text: string;
  readonly isRoot: boolean;
  readonly component: any;
};

export interface ITypes {
  [key: string]: any;
};

export interface IStore {
  [key: string]: any;
};

export interface IAction {
  type: string;
  payload?: any;
};

export interface ICounterStore extends IStore {
  count: number;
};

export interface IUseCounterResult {
  state: ICounterStore;
  increaseCount: (count?: number) => void;
  resetCount: () => void;
};

export type TCounterReducer = (state: ICounterStore, action: IAction) => ICounterStore | never;

export type TUseCounter = (state?: ICounterStore) => IUseCounterResult;

export interface IGetTestListParams {
  pageNum: number;
  pageSize?: number;
};

export interface ITableColumn {
  title: string | number | React.ReactElement;
  dataIndex: string;
  key: string;
  render?: (text: any, record: ITableColumn, index: number) => string | number | React.ReactElement;
};

export interface ITablePagination {
  total?: number;
  pageNum: number;
  pageSize?: number;
};

export interface ITableProps {
  columns: Array<ITableColumn>;
  dataSource: Array<any>;
  pagination: ITablePagination;
}

export interface ITableListItem {
  id: number;
  name: string;
  age: number;
};

export interface ITableStore {
  tableList: Array<ITableListItem>;
  pagination: ITablePagination;
};

export interface IUseTableResult {
  state: ITableStore;
  error: Error | undefined;
  loading: boolean;
  changePage: (payload: ITablePagination) => void;
}

export type THttpRequest<T> = (params: T) => Promise<any>;

export type TUseTableReducer = (state: ITableStore, action: IAction) => ITableStore | never;

export type TRenderWithUseRequest = (error: any, loading: any, element: React.ReactElement) => React.ReactElement;

export type TUseTable = (httpRequest: THttpRequest<IGetTestListParams>, payload?: ITablePagination) => IUseTableResult;