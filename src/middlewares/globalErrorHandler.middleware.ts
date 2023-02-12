import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/CustomError';
import logger from '../lib/logger';

const globalErrorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    const errorObject = {
      errorCode: err.errorCode,
      errorType: err.errorType,
      details: err.serializeErrors(),
    };

    logger.error(JSON.stringify(errorObject));

    return res.status(err.errorCode).send(errorObject);
  }

  logger.error('error' + err);
  res.status(500).send({ error: [{ message: 'Some error occured! ' }] });
};

export default globalErrorHandler;
