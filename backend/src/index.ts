import cluster from "cluster";
import { cpus } from "os";
import logger from "./adapters/loggerAdapter";
import { app } from "./app";

const startApp = () => {
  const PORT: number = 8000;
  const HOSTNAME: string = "127.0.0.1";
  app.listen(PORT, () => {
    logger.info(
      `WORKER (pid=${process.pid})app is running on http://${HOSTNAME}:${PORT}`
    );
  });
};

const ENABLE_CLUSTER: boolean = true;
const numCPUs = cpus().length;
process.env.UV_THREADPOOL_SIZE = `${4}`;
logger.info(`numCPUs = ${numCPUs}`);

if (ENABLE_CLUSTER) {
  if (cluster.isMaster) {
    logger.info(`Primary process is running pid=${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      logger.info(`worker ${worker.process.pid} died`);
    });
  } else {
    startApp();
  }
} else {
  startApp();
}
