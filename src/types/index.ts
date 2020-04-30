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

// {
//   title: $formMessage('adNum',),
//   dataIndex: 'adId',
//   key: 'adId',
// },