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

      console.log('testeeeee')
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
  
  public findAllPaged = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const search = req.query.search !== undefined ? String(req.query.search) : "";
      const page = req.query.page !== undefined ? String(req.query.page) : "1";
      const limit = req.query.limit !== undefined ? String(req.query.limit) : "10";
      return res.status(200).json(await groupService.findAllPaged(page, limit, search));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public findAllGroupsByUserPaged = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const userId = req.params.idUser;
      const search = req.query.search !== undefined ? String(req.query.search) : "";
      const page = req.query.page !== undefined ? String(req.query.page) : "1";
      const limit = req.query.limit !== undefined ? String(req.query.limit) : "10";

      return res.status(200).json(await groupService.findAllPaged(page, limit, search, parseInt(userId)));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public findAllPagedByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const userId = parseInt(req.params.userId);
      const search = req.query.search !== undefined ? String(req.query.search) : "";
      const page = req.query.page !== undefined ? String(req.query.page) : "1";
      const limit = req.query.limit !== undefined ? String(req.query.limit) : "10";
      return res.status(200).json(await groupService.findAllPaged(page, limit, search, userId));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getGroupMapByUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const email = req.params.email;
      return res.status(200).json(await groupService.getGroupMapByUser(email));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getMapsFromGroupByUserAndGroup = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const idUser = req.params.idUser;
      const idGroup = req.params.idGroup;
      const limit = req.query.limit;
      const offset = req.query.offset;

      console.log(idUser, idGroup)
      return res.status(200).json(await groupService.getMapsFromGroupByUserAndGroup(parseInt(idUser), parseInt(idGroup) , parseInt(limit as string), parseInt(offset as string)));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export const groupController = new GroupController(groupService);
