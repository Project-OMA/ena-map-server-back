import { CrudRepository } from './CrudRepository';
import { CreateUserGroupDTO, UpdateUserGroupDTO, UserGroupDTO } from '../entities/UserGroup';
import { CreateGroupMapDTO, GroupMapDTO, UpdateGroupMapDTO } from '../entities/GroupMap';
import dao from '../config/dao';

class GroupMapRepository extends CrudRepository<GroupMapDTO, CreateGroupMapDTO, UpdateGroupMapDTO> {
  public async getMapByGroupId(id: number): Promise<any[]> {
    return dao.$queryRaw`
      SELECT * FROM servidor_mapas.rel_group_map AS groupMap
      INNER JOIN servidor_mapas.tb_map AS map ON map.id = groupMap.id_map
      WHERE groupMap.id_group = ${id}
    `;
  }
}

export const groupMapRepository = new GroupMapRepository('groupMap', 'id_group');
