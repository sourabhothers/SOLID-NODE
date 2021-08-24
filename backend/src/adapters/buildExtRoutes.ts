import {
  IExtControllerNextFn,
  IExtRoutesArr,
  IExtSingleRoutesObj,
} from "../types/adapters";
import routes from "../api/v1/routes";
import ExtControllerBuild from "./buildExtController";

let extRoutesArr: IExtRoutesArr = [];
const buildExtRoutesArr = () => {
  routes.forEach((currRoute) => {
    const { method, path, controller } = currRoute;
    const middlewares: IExtControllerNextFn[] = [];
    const currRouteBuilt: IExtSingleRoutesObj = {
      method,
      path,
      middlewares,
      controller: async (req, res) => {
        //custom controller builder
        const builtCtx = new ExtControllerBuild(req, res);
        controller(builtCtx);
      },
    };
    extRoutesArr.push(currRouteBuilt);
  });
};
buildExtRoutesArr();

export default extRoutesArr;
