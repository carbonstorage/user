import { Request, Response } from 'express';
import logger from '../../lib/logger';

import { PrismaClient } from '@prisma/client';
import ValidationError from '../../errors/ValidationError';
import DatabaseError from '../../errors/DatabaseError';

const prisma = new PrismaClient();

export default class UserService {
  public async getUser(req: Request, res: Response) {
    const allUsers = await prisma.user.findMany();
    res.status(200).json({ users: allUsers });
  }

  public async getUserById(req: Request, res: Response) {
    return res.send(`${req.params.id} route`);
  }

  public async createUser(req: Request, res: Response) {
    const { email, name, age }: { email: string; name: string; age: number } =
      req.body;
    if (name.length < 2) {
      throw new ValidationError(
        'Name should be longer than 1 characters!',
        'name',
      );
    }

    try {
      const user = await prisma.user.create({
        data: { email, name, age },
      });
      logger.info(`Created user id: ${user.id}`);
      res.status(200).json({ user });
    } catch (err) {
      throw new DatabaseError(err, 'database');
    }
  }
}
