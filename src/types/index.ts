export interface IRoute {
  readonly path: string;
  readonly text: string;
  readonly isRoot: boolean;
  readonly component: any;
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