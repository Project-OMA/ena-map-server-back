import { CrudController } from './CrudController';
import { groupService } from '../../services/GroupService';
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from '../../entities/Group';
import { NextFunction, Request, Response } from 'express-serve-static-core';

class GroupController extends CrudController<GroupDTO, CreateGroupDTO, UpdateGroupDTO> {
  // public createWithUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  //   try {
  //     const data: CreateGroupDTO = req.body;
  //     return res.status(200).json(await groupService.createWithUsers(data));
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
  // };

  // public updateWithUsersAndMaps = async (
  //   req: Request,
  //   res: Response,
  //   next: NextFunction,
  // ): Promise<Response | undefined> => {
  //   try {
  //     const data: UpdateGroupDTO = req.body;
  //     const id: number = parseInt(req.params.id);
  //     return res.status(200).json(await groupService.updateWithUsersAndMaps(id, data));
  //   } catch (error) {
  //     console.error(error);
  //     next(error);
  //   }
  // };

  public override create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const data = req.body;
      return res.status(200).json(await groupService.create(data));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public updateGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      return res.status(200).json(await groupService.update(id, data));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getMapsFromGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id);
      return res.status(200).json(await groupService.getMapsByGroup(id));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export const groupController = new GroupController(groupService);
