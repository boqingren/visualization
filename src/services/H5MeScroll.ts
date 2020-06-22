import { http } from "../utils";
import { api } from "../configs";
import { IGetPageDataParams, THttpRequest } from "../types";

export const getPageData: THttpRequest<IGetPageDataParams> = async params => http.get(api.getInviteRecordApi, params);