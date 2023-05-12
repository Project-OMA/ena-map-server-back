import { NextFunction, Request, Response } from 'express';
import { mapService } from '../../services/MapService';
import Map, { CreateMapDTO, UpdateMapDTO, MapDTO } from '../../entities/Map';
import { CrudController } from './CrudController';

class MapController extends CrudController<MapDTO, CreateMapDTO, UpdateMapDTO> {}

export const mapController = new MapController(mapService);
