import { NextFunction, Request, Response } from 'express';
import GroupService from '../../services/GroupService';
import User, { CreateUser, ReadUser, UpdateUser } from '../../entities/User';
import { CreateGroup, UpdateGroup } from '../../entities/Group';
import { Group } from '@prisma/client';

class GroupController {
  async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      return res.status(200).json(await GroupService.findAll());
    } catch (error: any) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const group: Group = await GroupService.findById(parseInt(req.params.id));
      return res.status(200).json(group);
    } catch (error: any) {
      next(error);
    }
  }

  async findByOwnerId(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const group: Group[] = await GroupService.findByOwnerId(parseInt(req.params.id));
      return res.status(200).json(group);
    } catch (error: any) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const data: CreateGroup = req.body;
      return res.status(201).json(await GroupService.create(data));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateGroup = req.body;
      return res.status(204).json(await GroupService.update(id, data));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const id = parseInt(req.params.id);
      return res.status(204).json(await GroupService.delete(id));
    } catch (error) {
      next(error);
    }
  }
}

export default new GroupController();
