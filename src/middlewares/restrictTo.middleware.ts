import { Request, Response, NextFunction } from 'express';
import UserRoles from '../enums/useroles.enum';
import logger from '../lib/logger';

const restrictTo =
  (roles: UserRoles) => (_req: Request, _res: Response, next: NextFunction) => {
    logger.info(`Roles passed: ${roles}`);
    next();
  };

export default restrictTo;
