import axios from "axios";
import { HTTP_HEADERS, HTTP_STATUS, HTTP_METHOD, HTTP_CODE } from "../configs/http";

axios.interceptors.request.use((config: any) => {
  return config;
});

axios.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  return Promise.resolve(error);
});

const getRequestOpts = (url: string, opts: any) => ({
  url,
  params: opts.params? opts.params: null,
  data: opts.data? opts.data: null,
  method: opts.method,
  headers: !opts.headers? HTTP_HEADERS: {
    ...HTTP_HEADERS,
    ...opts.headers
  }
});

const getExceptionStatus = (response: any) => {
  const is401 = response.code === 401;
  const exceptionStatus = is401? HTTP_STATUS.NO_ACCESS: HTTP_STATUS.NOT_FOUND;
  return exceptionStatus;
};

const checkStatus = (response: any) => {
  const isStartsWith2 = response && response.status.toString().startsWith("2");
  if (isStartsWith2) return response.data;
  const exceptionStatus = getExceptionStatus(response);
  return {
    code: exceptionStatus.code,
    msg: exceptionStatus.msg,
    data: null
  };
};

const checkCode = (result: any, url: any, opts: any, retrieveResult: any, retrieveError: any) => {
  switch(Number(result.code)) {
    case HTTP_CODE.SUCCESSFUL:
      const data = result.data !== null? result.data: true;
      retrieveResult(data);
      break;
    default:
      throw result;
  };
};

const handleHttpException = (error: any, retrieveResult: any, retrieveError: any) => {
  console.log("handleHttpException error:", error);
};

const request = (url: string, opts: any) => new Promise((retrieveResult, retrieveError) => axios
  .request(getRequestOpts(url, opts))
  .then(response => checkStatus(response))
  .then(result => checkCode(result, url, opts, retrieveResult, retrieveError))
  .catch(error => handleHttpException(error, retrieveResult, retrieveError)));

const get = (url: string, params: any) => request(url, {
  method: HTTP_METHOD.GET,
  params
});

const post = (url: string, params: any) => request(url, {
  method: HTTP_METHOD.POST,
  params
});

const put = (url: string, params: any) => request(url, {
  method: HTTP_METHOD.PUT,
  params
});

export default {
  get,
  post,
  put
};