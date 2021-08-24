const express = require("express");
const app = express();

// Creating router object
const router = express.Router();

const withoutAdapterBenchmark = () => {
  for (let i = 0; i < 1000; i++) {
    const randomPath = Math.floor(Math.random() * 10000).toString();
    router.get(`/${randomPath}`, (req, res) => {
      res.status(200).send(`/${randomPath} is succeeded`);
    });
  }

  router.get("/get", (req, res) => {
    res.status(200).send("/get path succeeded");
  });
};

const internalRoutes = [];
const benchmarkTest = () => {
  for (let i = 0; i < 1000; i++) {
    const randomPath = Math.floor(Math.random() * 10000).toString();
    const newRoute = {
      path: `/${randomPath}`,
      method: "get",
      middlewares: [],
      controller: (ctx) => {
        ctx.status(200).send(`/${randomPath} path succeeded`);
      },
    };
    internalRoutes.push(newRoute);
  }

  internalRoutes.push({
    path: "/get",
    method: "get",
    middlewares: [],
    controller: (ctx) => {
      ctx.status(200).send("/get path succeeded");
    },
  });
};
const buildExpressRoutes = () => {
  class InternalControllerToExpressController {
    expressRequest;
    expressResponse;
    internalRequest;
    internalResponse;
    constructor(expressRequest, expressResponse) {
      this.expressRequest = expressRequest;
      this.expressResponse = expressResponse;
    }
    status(statusCode = 222) {
      this.expressResponse.status(statusCode);
      return this;
    }
    send(message = "default send message") {
      this.expressResponse.send(message);
    }
  }

  const expressRoutes = [];
  internalRoutes.forEach((currRoute, currRouteIdx) => {
    const { path, method, middlewares, controller } = currRoute;
    const currRouteBuild = {
      path,
      method,
      middlewares,
      controller: (expressRequest, expressResponse) => {
        const controllerConverterWithCtx =
          new InternalControllerToExpressController(
            expressRequest,
            expressResponse
          );
        controller(controllerConverterWithCtx);
      },
    };
    expressRoutes[currRouteIdx] = currRouteBuild;
  });

  expressRoutes.forEach((currExRoute) => {
    const { path, method, middlewares, controller } = currExRoute;
    router[method](path, controller);
  });
};
// Benchmarking
// withoutAdapterBenchmark();
benchmarkTest();
buildExpressRoutes();

// using router object in app
app.use(router);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
