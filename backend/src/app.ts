import express, { Router } from "express";
import buildExpressRouter from "./utils/buildExpressRouter";

export const app = express();
const router = Router();
app.use(router);

// builtRoutesArr OR expressRoutes
buildExpressRouter(router);
const err = new Error("Own thrown error");
console.log(err.stack);

router.get("/404", (req, res, next) => {
  res.status(404).send("404 Not Found");
});
router.get("*", (req, res) => {
  res.redirect("/404");
});

//FIXME: Decide what steps to do next.
// TODO: Hey
// x : Hey
