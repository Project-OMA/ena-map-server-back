import Map, { CreateMapDTO, MapDTO, UpdateMapDTO } from '../entities/Map';
import dao, { models } from '../config/dao';
import { CrudRepository } from './CrudRepository';
import { PrismaPaginationQuery } from '../types/prismaPaginationQuery';

const select = {
  id: true,
  name: true,
  id_owner: true,
  tag: true,
}
class MapRepository extends CrudRepository<MapDTO, CreateMapDTO, UpdateMapDTO> {

  public async getByGroupId(id: number): Promise<MapDTO[]> {
    return dao.$queryRaw<
      Map[]
    >`SELECT m.id, m.name, m.id_owner, m.url, m.thumb_url, m.tag, m.created_at, m.updated_at FROM tb_map AS m JOIN rel_group_map AS rel ON rel.id_map = m.id WHERE rel.id_group = ${id}`;
  }

  public async getMapsByName(query: string) {
    return models.map.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      select,
    });
  }
  
  public async getAllPaged(page: string, limit: string, search: string): Promise<MapDTO[]> {
    let query: PrismaPaginationQuery = {
      select,
      orderBy: {
        created_at: "desc",
      },
    }

    if(search) query.where = {  name: { contains: search } }

    let skip: number | null = null;
    let take: number | null = null;
    if(page || limit){
      take = Number(limit)
      skip = (Number(page) - 1) * take
      query.skip = skip
      query.take = take
    }
    
    return await models.map.findMany(query);
  }
}

export const mapRepository = new MapRepository('map', 'id');
