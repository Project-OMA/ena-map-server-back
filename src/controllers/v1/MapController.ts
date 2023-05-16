import { NextFunction, Request, Response } from 'express';
import { mapService } from '../../services/MapService';
import Map, { CreateMapDTO, UpdateMapDTO, MapDTO } from '../../entities/Map';
import { CrudController } from './CrudController';

class MapController extends CrudController<MapDTO, CreateMapDTO, UpdateMapDTO> {
    public getByGroupId = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        try {
          const id = parseInt(req.params.id);
          return res.status(200).json(await mapService.getByGroupId(id));
        } catch (error) {
          console.error(error);
          next(error);
        }
    };
}

export const mapController = new MapController(mapService);
