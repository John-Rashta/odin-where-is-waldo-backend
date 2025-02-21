import { ErrorRequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Error" });
  return;
};

export { errorHandler };
