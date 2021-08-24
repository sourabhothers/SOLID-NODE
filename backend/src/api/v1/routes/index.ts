import { Request, Response, Router, IRoute } from "express";
import { IRoutesArr, RouteMethods } from "../../../types/adapters";
import { controller_1 } from "../controllers";

// export default (router: Router) => {
//   router.get("/1", );
//   return router;
// };

const routes: IRoutesArr = [
  {
    path: "/test",
    controller: controller_1,
    middlewares: [],
    method: "get",
  },
  {
    path: "/test-2",
    controller: controller_1,
    middlewares: [],
    method: "get",
  },
];

export default routes;
