import { Response, Request, NextFunction } from "express";
import { ApplicationError } from "../protocols/protocols";
import httpStatus from "http-status";

function handleApplicationErrors(
  err: ApplicationError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "conflictError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "notFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  if (err.name === "InvalidDataError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }
  /* eslint-disable-next-line no-console */
  console.error(err.name);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}

export default handleApplicationErrors