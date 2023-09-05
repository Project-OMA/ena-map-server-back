import { mapRepository } from '../repository/MapRespository';
import { MapDTO, CreateMapDTO, UpdateMapDTO, CreateMapConvert } from '../entities/Map';
import { CrudService } from './CrudService';
import { scriptReader } from '../utils/scriptReader';
import fs from 'fs';
import path from 'path';
import { badRequest } from '../helpers/responseHelper';

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

  async downloadMap(idMapa: number, res: any): Promise<any> {
    const mapResponse = await mapRepository.getById(idMapa);

    if (mapResponse) {
      const mapJson = JSON.stringify({
        id_professor: mapResponse.id,
        id_mapa: mapResponse.id,
        mapa_json: JSON.parse(mapResponse.tag),
      });
      const pathName = path.resolve(
        __dirname,
        '../../',
        `assets/json/${mapResponse.name.toLowerCase().replace(' ', '-')}.json`,
      );

      fs.writeFileSync(pathName, mapJson);
      const fileName = `${mapResponse.name.toLowerCase().replace(' ', '-')}.json`;
      const fileStream = fs.createReadStream(pathName);

      res.setHeader(
        'Content-Disposition',
        `attachment; filename=${mapResponse.name.toLowerCase().replace(' ', '-')}.json`,
      );
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);

      const buffer = fs.readFileSync(pathName);

      console.log('buffer', buffer);
      res.end(buffer);

      fs.unlinkSync(pathName);
    }
  }
}

export const mapService = new MapService(mapRepository);
