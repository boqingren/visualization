import { http } from "../utils";
import { api } from "../configs";
import { IGetTestListParams, THttpRequest } from "../types";

export const getTestList: THttpRequest<IGetTestListParams> = async params => http.get(api.getTestListApi, params);