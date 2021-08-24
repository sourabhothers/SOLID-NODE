import { Method } from "axios";
import {
  IRoute,
  IRouter,
  IRouterMatcher,
  NextFunction,
  Request,
  Response,
  Router,
} from "express";
import { IncomingMessage, ServerResponse } from "http";

// For different server libraries Change Request , Response Type here below
export type IExtRouter = Router;
export type IExtRequest = Request;
export type IExtResponse = Response;
export type IExtNextFunction = NextFunction; //Till here only

export type RouteMethods =
  | "all"
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";
export enum ContentType {
  "json",
  "html",
  "plain",
  "image",
  "binary",
}

export interface ICtxContructor {
  new (extRequest: IExtRequest, extResponse: IExtResponse): ICtxContructor;
}

export interface ICtxWithExt {
  data?: { pathname: string };
  extRequest: IExtRequest;
  extResponse: IExtResponse;
  message: string;
  statusCode: number;
  parseData: () => void;
  status: (statusCode: number) => this;
  json?: (jsonObj: { [key: string]: any }) => void;
  send: (message: string) => void;
  finalize: () => void;
}

export type ICtx = ICtxWithExt;

export type IController = (ctx: ICtx) => any;
export type IControllerNextFn = (ctx: ICtx, next: (data?: any) => void) => any;

export interface BuildSingleRouteObj<CType, NFType> {
  path: string;
  method: RouteMethods;
  middlewares?: NFType[];
  controller: CType;
}

export type ISingleRoutesObj = BuildSingleRouteObj<
  IController,
  IControllerNextFn
>;

export type IRoutesArr = Array<ISingleRoutesObj>;

// External library data
export type IExtController = (req: IExtRequest, response: IExtResponse) => void;
export type IExtControllerNextFn = (
  req: IExtRequest,
  res: IExtResponse,
  next: IExtNextFunction
) => void;
export type IExtSingleRoutesObj = BuildSingleRouteObj<
  IExtController,
  IExtControllerNextFn
>;
export type IExtRoutesArr = Array<IExtSingleRoutesObj>;
