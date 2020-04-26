import axios from "axios";
import * as api from "../configs/api";

export interface IGetTestListParams {
  id: number;
  name: string;
  age: number;
};

export const getTestList: (params: IGetTestListParams) => Promise<any> = async params => {
  return axios.get(api.getTestList, {
    params
  });
};