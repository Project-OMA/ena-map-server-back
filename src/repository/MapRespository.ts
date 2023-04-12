import Map, { CreateMap, UpdateMap } from '../entities/Map';
import { models } from '../config/dao';

class MapRepository {
  idKey: string;

  constructor() {
    this.idKey = 'id';
  }

  async create(data: CreateMap): Promise<Map> {
    return await models.map.create({ data });
  }

  async delete(id: number): Promise<Map> {
    return await models.map.delete({ where: { [this.idKey]: id } });
  }

  async update(id: number, data: UpdateMap): Promise<Map> {
    return await models.map.update({ where: { [this.idKey]: id }, data });
  }

  async findAll(): Promise<Map[]> {
    return await models.map.findMany();
  }

  async findById(id: number): Promise<Map | null> {
    return await models.map.findUnique({ where: { [this.idKey]: id } });
  }
}

export default MapRepository;
