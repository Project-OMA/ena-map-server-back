import { NextFunction, Request, Response } from 'express';
// import { ok, serverError } from '../helpers/responseHelper';
import { CrudService } from '../../services/CrudService';

export abstract class CrudController<Entity, CreateDTO, UpdateDTO> {
  service: CrudService<Entity, CreateDTO, UpdateDTO>;
  constructor(service: CrudService<Entity, CreateDTO, UpdateDTO>) {
    this.service = service;
  }

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id + '');
      return res.status(200).json(await this.service.getById(id));
      //   return ok(res, await this.service.getById(id));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getManyById = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id + '');
      return res.status(200).json(await this.service.getManyById(id));
      //   return ok(res, await this.service.getManyById(id));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      console.log('testee', req);
      const data: CreateDTO = req.body;
      return res.status(200).json(await this.service.create(data));
      //   return ok(res, await this.service.create(data));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id + '');
      const data: UpdateDTO = req.body;
      return res.status(200).json(await this.service.update(id, data));
      //   return ok(res, await this.service.update(id, data));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public list = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      //   const data = req.pagination;
      return res.status(200).json(await this.service.list());
      //   return ok(res, await this.service.list());
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public listAll = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      //   const data = req.pagination;
      return res.status(200).json(await this.service.listAll());
      //   return ok(res, await this.service.listAll());
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
