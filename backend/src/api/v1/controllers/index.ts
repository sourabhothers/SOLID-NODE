import logger from "../../../adapters/loggerAdapter";
import { ICtx } from "../../../types/adapters";
import { timeoutMessage, readMe } from "../services";

export const controller_1 = async (ctx: ICtx) => {
  logger.info(`Request came`);
  const { path, method, ip, protocol } = ctx.extRequest;
  logger.info(`${method} ${path} ${protocol} ${ip}`);
  const start = Date.now();
  // const message = await timeoutMessage("Hello after", 5000);
  const message = readMe();
  ctx
    .status(200)
    .send(
      `start=${start} end=${Date.now()}  Time took=${
        Date.now() - start
      }  : PID=${process.pid}`
    );
  logger.info(
    `SENT :  start=${start} end=${Date.now()}  Time took=${
      Date.now() - start
    }  : PID=${process.pid}`
  );
};
