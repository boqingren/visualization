// export const baseUrl = "https://www.fastmock.site/mock/15041c4dca7ca5ec42168c088f9b2c10";
export const baseUrl = "http://localhost:7000";

export const HTTP_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put"
};

export const HTTP_HEADERS = {
  "Accept": "application/json",
  "Content-Type": "application/json; charset=utf-8"
};

export const HTTP_STATUS = {
  NO_ACCESS: {
    code: 401,
    msg: "No Access!"
  },
  NOT_FOUND: {
    code: 404,
    msg: "The requested resource is not found!"
  }
};

export const HTTP_CODE = {
  SUCCESSFUL: 200
};