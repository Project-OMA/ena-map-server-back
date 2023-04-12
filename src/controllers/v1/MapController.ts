import { NextFunction, Request, Response } from 'express';
import MapService from '../../services/MapService';
import Map, { CreateMap, UpdateMap } from '../../entities/Map';

class MapController {
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const data: CreateMap = req.body;
      console.log('teste', data);
      return res.status(200).json(await MapService.create(data));
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const id = parseInt(req.params.id);
      const data: UpdateMap = req.body;
      return res.status(200).json(await MapService.update(id, data));
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const id = parseInt(req.params.id);
      return res.status(200).json(await MapService.delete(id));
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      return res.status(200).json(await MapService.findAll());
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
    try {
      const id = parseInt(req.params.id);
      const map: Map = await MapService.findById(id);
      return res.status(200).json(map);
    } catch (error) {
      next(error);
    }
  }
}

export default new MapController();
