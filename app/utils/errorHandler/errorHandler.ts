import * as Sentry from "@sentry/node";
import { NextFunction, Request, Response } from "express";

interface HttpError extends Error {
  status: number;
}

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);

  const isProductionMode = process.env.NODE_ENV === "production";

  Sentry.captureException(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(!isProductionMode && { stack: err.stack }),
  });
};
