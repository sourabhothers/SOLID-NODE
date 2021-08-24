const Koa = require("koa");
const app = new Koa();
let totalErrorCount = 0;

app.on("error", (err, ctx) => {
  if (err.code === "EPIPE") {
    totalErrorCount++;
    console.log(`EPIPE error occurs ${totalErrorCount} times`);
  }
  return;
});

// Creating router object
const koaRouter = require("koa-router");
const router = koaRouter();

const addSingleRoute = () => {
  router.get("/get", async (ctx) => {
    ctx.status = 200;
    ctx.body = "/get path succeeded";
  });
};

const withoutAdapterBenchmark = () => {
  for (let i = 0; i < 100; i++) {
    const randomPath = Math.floor(Math.random() * 10000).toString();
    router.get(`/${randomPath}`, async (ctx) => {
      ctx.status(200).send(`/${randomPath} is succeeded`);
    });
  }

  router.get("/get", async (ctx) => {
    ctx.status = 201;
    ctx.body = "/get path succeeded";
  });
};

const internalRoutes = [];
const benchmarkTest = () => {
  for (let i = 0; i < 100; i++) {
    const randomPath = Math.floor(Math.random() * 10000).toString();
    const newRoute = {
      path: `/${randomPath}`,
      method: "get",
      middlewares: [],
      controller: async (ctx) => {
        ctx.status(200).send(`/${randomPath} path succeeded`);
      },
    };
    internalRoutes.push(newRoute);
  }

  internalRoutes.push({
    path: "/get",
    method: "get",
    middlewares: [],
    controller: async (ctx) => {
      ctx.status(200).send("/get path succeeded");
    },
  });
};
const buildKoaRoutes = () => {
  class InternalControllerToKoaController {
    koaCtx;
    internalRequest;
    internalResponse;
    constructor(koaCtx) {
      this.koaCtx = koaCtx;
    }
    status(statusCode = 200) {
      this.koaCtx.status = statusCode;
      return this;
    }
    send(message = "default send message") {
      this.koaCtx.body = message;
      return;
    }
  }

  const koaRoutes = [];
  internalRoutes.forEach((currRoute, currRouteIdx) => {
    const { path, method, middlewares, controller } = currRoute;
    const currRouteBuild = {
      path,
      method,
      middlewares,
      controller: (koaRequest, koaResponse) => {
        const controllerConverterWithCtx =
          new InternalControllerToKoaController(koaRequest, koaResponse);
        controller(controllerConverterWithCtx);
      },
    };
    koaRoutes[currRouteIdx] = currRouteBuild;
  });

  koaRoutes.forEach((currExRoute) => {
    const { path, method, middlewares, controller } = currExRoute;
    router[method](path, controller);
  });
};
// Benchmarking
addSingleRoute();
// withoutAdapterBenchmark();
// benchmarkTest();
// buildKoaRoutes();

// using router object in app
console.log("-------------- ROUTES -----------");
app.use(router.routes());
// for( let i of Object.keys(app.callback())){}
// console.dir(app.callback()   );

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
