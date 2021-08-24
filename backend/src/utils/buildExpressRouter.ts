import extRoutesArr from "../adapters/buildExtRoutes";
import { IExtRouter } from "../types/adapters";

const buildExpressRouter = (router: IExtRouter) => {
  extRoutesArr.forEach((route) => {
    router[route.method](route.path, route.middlewares!, route.controller);
  });
};

export default buildExpressRouter;
