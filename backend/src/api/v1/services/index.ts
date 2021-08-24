import fs from "fs";
import path from "path";

type TimeoutMessage = (message: string, timeout: number) => Promise<string>;
const readMeTxtFile = path.resolve(__dirname, "./readMe.txt");

export const timeoutMessage: TimeoutMessage = async (
  message: string,
  timeout = 1000
) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(message + " " + timeout);
    }, timeout);
    // return resolve(message + " " + timeout);
  });
};

export const readMe = () => {
  const readData = fs.readFileSync(readMeTxtFile);
  return readData;
};
