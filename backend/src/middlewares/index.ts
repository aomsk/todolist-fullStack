import { Request, Response, NextFunction } from "express";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const date = new Date();
  console.log(`${req.method} ${req.path} ${date}}`);
  next();
};
