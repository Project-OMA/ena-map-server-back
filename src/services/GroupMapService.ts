import { CrudService } from './CrudService';
import { groupMapRepository } from '../repository/GroupMapRepository';
import { CreateGroupMapDTO, GroupMapDTO, UpdateGroupMapDTO } from '../entities/GroupMap';

class GroupMapService extends CrudService<GroupMapDTO, CreateGroupMapDTO, UpdateGroupMapDTO> {
  async createMany(groupId: number, maps: number[]) {
    for (const [index, idMap] of (maps as number[]).entries()) {
      await groupMapService.create({
        id_group: groupId,
        id_map: idMap,
        order: index,
      });
    }
  }

  async deleteMany(groupId: number) {
    await groupMapRepository.deleteMany(groupId);
  }
}

export const groupMapService = new GroupMapService(groupMapRepository);
