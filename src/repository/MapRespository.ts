import Map, { CreateMapDTO, MapDTO, UpdateMapDTO } from '../entities/Map';
import dao, { models } from '../config/dao';
import { CrudRepository } from './CrudRepository';

class MapRepository extends CrudRepository<MapDTO, CreateMapDTO, UpdateMapDTO> {
    public async getByGroupId(id: number): Promise<MapDTO[]> {
        return dao.$queryRaw<Map[]>`SELECT m.id, m.name, m.id_owner, m.url, m.thumb_url, m.tag, m.created_at, m.updated_at FROM tb_map AS m JOIN rel_group_map AS rel ON rel.id_map = m.id WHERE rel.id_group = ${id}`;
    }
}

export const mapRepository = new MapRepository('map', 'id');
