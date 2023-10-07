import { CrudService } from './CrudService';
import { userGroupRepository } from '../repository/UserGroupRepository';
import { CreateUserMapDTO, UpdateUserMapDTO, UserMapDTO } from '../entities/UserMap';
import { userMapRepository } from '../repository/UserMapRepository';

class UserMapService extends CrudService<UserMapDTO, CreateUserMapDTO, UpdateUserMapDTO> {
  async createMany(mapIds: number[], users: number[]) {
    for (const idUser of users) {
      for (const idMap of mapIds) {
        const userMapRelation = await userMapRepository.getManyById(idMap);
        console.log('userMapRelation', userMapRelation)

        // if there is a user relation with the map it wont create a new one
        if(userMapRelation.length < 1) {
          await userMapRepository.create({
            id_map: idMap,
            id_user: idUser,
            in_completed: false
          });
        }
      }
    }
  }

  async deleteMany(groupId: number) {
    await userGroupRepository.deleteMany(groupId);
  }
}

export const userMapService = new UserMapService(userMapRepository);
