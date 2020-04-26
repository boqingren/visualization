import { http } from "../utils";
import { api } from "../configs";

export interface IGetTestListParams {
  id: number;
  name: string;
  age: number;
};

export const getTestList: (params: IGetTestListParams) => Promise<any> = async params => http.get(api.getTestListApi, {
  params
});