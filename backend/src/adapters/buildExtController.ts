// TODO : Pass callbackFn to build Following class Using Closures

import { ICtx, IExtRequest, IExtResponse } from "../types/adapters";

const DEFAULT_STATUS_CODE = 200;
const DEFAULT_MESSAGE = "";

export default class ExtControllerBuild implements ICtx {
  extRequest: IExtRequest;
  extResponse: IExtResponse;
  statusCode;
  message;
  constructor(extRequest: IExtRequest, extResponse: IExtResponse) {
    this.extRequest = extRequest;
    this.extResponse = extResponse;
    this.statusCode = DEFAULT_STATUS_CODE;
    this.message = DEFAULT_MESSAGE;
    this.parseData();
  }
  // json = () => {
  //   return this;
  // };
  // TODO : filter data( i.e. body, headers, cookie, ip, etc. ) from external request object and append to data={} object
  parseData = () => {};
  status(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }
  send(message: string) {
    this.message = message;
    this.finalize();
    return;
  }
  finalize() {
    this.extResponse.status(this.statusCode).send(this.message);
  }
}
