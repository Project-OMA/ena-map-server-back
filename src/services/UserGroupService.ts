import { CrudService } from './CrudService';
import { userGroupRepository } from '../repository/UserGroupRepository';
import { CreateUserGroupDTO, UpdateUserGroupDTO, UserGroupDTO } from '../entities/UserGroup';

class UserGroupService extends CrudService<UserGroupDTO, CreateUserGroupDTO, UpdateUserGroupDTO> {
  async createMany(groupId: number, users: number[]) {
    for (const idUser of users as number[]) {
      await userGroupRepository.create({
        id_group: groupId,
        id_user: idUser,
      });
    }
  }

  async deleteMany(groupId: number) {
    await userGroupRepository.deleteMany(groupId);
  }
}

export const userGroupService = new UserGroupService(userGroupRepository);
