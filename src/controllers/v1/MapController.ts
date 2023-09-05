import { NextFunction, Request, Response } from 'express';
import { mapService } from '../../services/MapService';
import Map, { CreateMapDTO, UpdateMapDTO, MapDTO } from '../../entities/Map';
import { CrudController } from './CrudController';

class MapController extends CrudController<MapDTO, CreateMapDTO, UpdateMapDTO> {
  public getMapsByName = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { query } = req.query;
      return res.status(200).json(await mapService.getMapsByName(query as string));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getByGroupId = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id);
      return res.status(200).json(await mapService.getByGroupId(id));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public convertXmlFile = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const { minify, files } = req.body;

      return res.status(200).json(await mapService.convertXmlFile({ minify, files: files[0] }));
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public downloadMap = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    try {
      const id = parseInt(req.params.id);

      return mapService.downloadMap(id, res);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}

export const mapController = new MapController(mapService);
