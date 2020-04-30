import { http } from "../utils";
import { api } from "../configs";
import { IGetTestListParams } from "../types";

export const getTestList: (params: IGetTestListParams) => Promise<any> = async params => http.get(api.getTestListApi, params);