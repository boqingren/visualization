export interface IRoute {
  readonly path: string;
  readonly text: string;
  readonly isShow: boolean,
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
  subPages?: Array<number>;
};

export interface ITableProps {
  columns: Array<ITableColumn>;
  dataSource: Array<any>;
  pagination: ITablePagination;
  changePage: (payload: ITablePagination) => void;
  setSubPages: (paginationSubs: Array<number>) => void;
};

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
  setSubPages: (paginationSubs: Array<number>) => void;
};

export type THttpRequest<T> = (params: T) => Promise<any>;

export type TUseTableReducer = (state: ITableStore, action: IAction) => ITableStore | never;

export type TRenderWithUseRequest = (error: any, loading: any, element: React.ReactElement) => React.ReactElement;

export type TUseTable = (httpRequest: THttpRequest<IGetTestListParams>, payload?: ITablePagination) => IUseTableResult;

export interface IPaginationStore {
  pageCount: number | undefined;
  current: number | undefined;
  inputValue: number | string;
  paginationList: Array<number>;
  paginationSubs: Array<number>;
  isFirstPageNum: boolean;
  isLastPageNum: boolean;
  isShowPreDots: boolean;
  isShowNextDots: boolean;
  isShowPreBtn: boolean;
  isShowNextBtn: boolean;
};

export interface IUsePaginationResult {
  state: IPaginationStore;
  handlePageItemLinkClick: (pageNum: number) => void;
  handlePreDotsClick: () => void;
  handleNextDotsClick: () => void;
  handlePreBtnClick: () => void;
  handleNextBtnClick: () => void;
  handleInputValueChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  handleJump: () => void;
};

export interface IRestBtnProps {
  isShow: boolean;
  handleClick: () => void;
};

export interface IPageLinksProps {
  current: number | undefined;
  paginationSubs: Array<number>;
  handleClick: (pageNum: number) => void;
};

export interface IJumpInputGroupProps {
  inputValue: number | string;
  handleInputValueChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined;
  handleJump: () => void;
};

export type TUsePaginationReducer = (state: IPaginationStore, action: IAction) => IPaginationStore | never;

export type TUsePagination = (params: ITableProps) => IUsePaginationResult | never;

export interface IGetPageDataParams extends IGetTestListParams {

};

export interface IScrollProps {
  id?: string;
  className?: string;
  initNum?: number;
  pageSize?: number;
  getPageData: (params: IUseScrollResult) => void;
  render: (store: IUseScrollResult) => React.ReactElement;
};

export interface IScrollStore {
  mescrollId?: string | null;
  pageNum: number;
  pageSize: number;
  mescroll?: object | null;
};

export interface IUseScrollResult {
  pageNum: number;
  pageSize: number;
  isDown: boolean,
  isUp: boolean,
  mescroll: object;
};

export type TUseScrollReducer = (state: IScrollStore, action: IAction) => IScrollStore | never;

export type TUseScroll = (params: IScrollProps) => IUseScrollResult | never;

export interface IH5MeScrollDataListItem {
  teamCount: number;
  userId: string;
  valid: boolean;
};

export interface IH5MeScrollPageListProps {
  dataList: Array<IH5MeScrollDataListItem>;
};

export interface IH5HeaderProps {
  path?: string;
  title: string;
};

export interface IH5WithHeaderProps extends IH5HeaderProps {
  
};