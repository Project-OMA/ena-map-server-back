import { mapRepository } from '../repository/MapRespository';
import { MapDTO, CreateMapDTO, UpdateMapDTO, CreateMapConvert } from '../entities/Map';
import { CrudService } from './CrudService';
import { scriptReader } from '../utils/scriptReader';

class MapService extends CrudService<MapDTO, CreateMapDTO, UpdateMapDTO> {
  async getMapsByName(query: string) {
    return await mapRepository.getMapsByName(query);
  }

  async getByGroupId(id: number) {
    return await mapRepository.getByGroupId(id);
  }

  async convertXmlFile(data: any): Promise<JSON | undefined> {
    return await scriptReader.convertXmlToJson(data);
  }

  override async create(data: CreateMapConvert): Promise<any> {
    const mapJson = await this.convertXmlFile({ minify: true, file: data.files[0] });

    if (mapJson) {
      return mapRepository.create({
        name: data.name,
        id_owner: Number(data.id_owner),
        tag: JSON.stringify(mapJson),
        thumb_url: data.files[0].name,
        url: data.url,
      });
    } else {
      throw new Error('Failed to convert Map Json.');
    }
  }
}

export const mapService = new MapService(mapRepository);
