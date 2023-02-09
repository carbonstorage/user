import { format, createLogger, transports } from 'winston';
import { MongoDB } from 'winston-mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { timestamp, combine, printf, errors } = format;

function logger() {
  const logFormat = printf(
    ({ level, message, timestamp, stack }) =>
      `${timestamp} ${level}: ${stack || message}`,
  );

  let logConstuctor;

  if (process.env.NODE_ENV === 'development') {
    logConstuctor = {
      format: combine(
        format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
      transports: [new transports.Console()],
    };
  } else if (process.env.NODE_ENV === 'production') {
    logConstuctor = {
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
      transports: [
        new MongoDB({
          db: process.env.CARBON_DB as string,
          collection: 'logs-prod',
        }),
      ],
    };
  }

  return createLogger(logConstuctor);
}

export default logger();
