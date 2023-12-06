import { CrudService } from './CrudService';
import { userGroupRepository } from '../repository/UserGroupRepository';
import { CreateUserGroupDTO, UpdateUserGroupDTO, UserGroupDTO } from '../entities/UserGroup';

class UserGroupService extends CrudService<UserGroupDTO, CreateUserGroupDTO, UpdateUserGroupDTO> {
  async createMany(groupId: number, users: number[]) {
    for (const idUser of users as number[]) {
      console.log('oiiii')
      await userGroupRepository.create({
        id_group: groupId,
        id_user: idUser,
      });
    }
  }

  async deleteMany(groupId: number) {
    const teste = await userGroupRepository.deleteMany(groupId);
    console.log('alooo', teste)
    return teste;
  }
}

export const userGroupService = new UserGroupService(userGroupRepository);
