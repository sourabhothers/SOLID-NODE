const service_1 = () => {};
/**
 *
 * @param {{body:object, headers: object}} internalRequest
 * @param {{status:(statusCode: number)=>this, send: (message: string)=>void}} internalResponse
 * @returns
 */
const controller_1 = (internalRequest, internalResponse) => {};

const internalRoutes = [
  { path: "/home", method: "get", middlewares: [], controller: controller_1 },
  { path: "/about", method: "get", middlewares: [], controller: controller_1 },
];

/**
 *
 * @param {[]} internalRoutes
 */
const convertInternalRoutesControllerToExpressRoutesController = (
  internalRoutes
) => {
  const internalRoutesControllerWrapped = [];
  internalRoutes.forEach();
};

/**
 *
 * @param { { path: "path", method: routerMethods, middlewares: controllersNext[], controller: (internalRequest, internalResponse)=>void }[]} internalRoutes
 * @param {"express"} express
 * @returns {expressRouter[]}
 */
const buildExpressRouterUsingInternalRoutes = (internalRoutes, express) => {
  const router = express.router();
  internalRoutes.forEach((currRoute) => {
    if (currRoute.middlewares.length === 0) {
      router[currRoute.method](currRoute.path, currRoute.controller);
    } else {
      // middlewares add if length > 0
    }
  });
};

const expressRouter = Router();
expressRouter.get("/path", (req, res) => {
  const body = req.body;

  res.send();
});

// class Utils {
//   cl = (str) => {
//     console.log(str);
//     return this;
//   };
// }

// const utils = new Utils();
// utils.cl("hello").cl("world").cl("again").cl("4th time");
