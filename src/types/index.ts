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