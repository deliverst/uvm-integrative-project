import type { Express } from "express";
import isAlive from './isAlive'
import docs from './docs'

export const routerApi = (app: Express) => {
  app.use("/", isAlive);
  app.use("/docs", docs);
};
