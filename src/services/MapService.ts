import { mapRepository } from '../repository/MapRespository';
import { MapDTO, CreateMapDTO, UpdateMapDTO } from '../entities/Map';
import { CrudService } from './CrudService';

class MapService extends CrudService<MapDTO, CreateMapDTO, UpdateMapDTO> {}

export const mapService = new MapService(mapRepository);
