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

export interface ITableComponentColumn {
  title: string | number | React.ReactElement;
  dataIndex: string;
  key: string;
  render?: (text: any, record: ITableComponentColumn, index: number) => string | number | React.ReactElement;
};

export interface ITableComponentPagination {
  total: number;
  pageNum: number;
  pageSize: number;
};

export interface ITableComponentProps {
  columns: Array<ITableComponentColumn>;
  dataSource: Array<any>;
  pagination: ITableComponentPagination;
}

export interface IGetTestListParams {
  id: number;
  name: string;
  age: number;
};

export type TRenderWithUseRequest = (error: any, loading: any, element: React.ReactElement) => React.ReactElement;