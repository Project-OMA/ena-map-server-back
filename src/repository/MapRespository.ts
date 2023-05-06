import Map, { CreateMapDTO, MapDTO, UpdateMapDTO } from '../entities/Map';
import { models } from '../config/dao';
import { CrudRepository } from './CrudRepository';

class MapRepository extends CrudRepository<MapDTO, CreateMapDTO, UpdateMapDTO> {}

export const mapRepository = new MapRepository('map', 'id');
