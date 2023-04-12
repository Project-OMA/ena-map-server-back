import UserRepository from '../repository/UserRepository';
import AppError from '../errors/AppError';
import MapRepository from '../repository/MapRespository';
import { CreateMap, UpdateMap } from '../entities/Map';

class MapService {
  mapRepository: MapRepository;
  constructor() {
    this.mapRepository = new MapRepository();
  }

  async create(data: CreateMap) {
    return await this.mapRepository.create(data);
  }

  async update(id: number, data: UpdateMap) {
    return await this.mapRepository.update(id, data);
  }

  async delete(id: number) {
    return await this.mapRepository.delete(id);
  }

  async findAll() {
    return (await this.mapRepository.findAll()).map((map) => ({
      ...map,
      id: parseInt(map.id.toString()),
    }));
  }

  async findById(id: number) {
    const map: any = await this.mapRepository.findById(id);
    if (!map && !map.id) {
      throw new AppError(404, 'Map not found');
    }
    map.id = parseInt(id.toString());
    return map;
  }
}

export default new MapService();
