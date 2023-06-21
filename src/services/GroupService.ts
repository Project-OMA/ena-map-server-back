import { CrudService } from './CrudService';
import AppError from '../errors/AppError';
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from '../entities/Group';
import { groupRepository } from '../repository/GroupRepository';
import { userService } from './UserService';
import { userGroupService } from './UserGroupService';
import { groupMapService } from './GroupMapService';

class GroupService extends CrudService<GroupDTO, CreateGroupDTO, UpdateGroupDTO> {
  // async createWithUsers(data: CreateGroupDTO): Promise<any> {
  //   const [groupByName] = await groupRepository.getByName(data.name || '');
  //   if (groupByName) {
  //     throw new AppError(400, 'Erro! Grupo já cadastrado');
  //   }

  //   return await groupRepository.createWithUsers(data);
  // }

  // async updateWithUsersAndMaps(id: number, data: UpdateGroupDTO): Promise<any> {
  //   const [groupByName] = await groupRepository.getByName(data.name || '');
  //   if (groupByName && groupByName.id !== id) {
  //     throw new AppError(400, 'Erro! Grupo já cadastrado');
  //   }

  //   return await groupRepository.updateWithUsersAndMaps(id, data);
  // }

  private buildGroup(data: any): any {
    const maps = data.rel_group_map.map((item: any) => ({
      ...item.map,
    }));

    const users = data.rel_user_group.map((item: any) => ({
      ...item.user,
    }));

    return {
      name: data.name,
      id_owner: data.id_owner,
      maps,
      users,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  }

  override async update(id: number, data: UpdateGroupDTO): Promise<any> {
    const groupUpdated = await groupRepository.update(id, { name: data.name as string });

    if (groupUpdated) {
      await userGroupService.deleteMany(id);
      await userGroupService.createMany(id, data.users as number[]);

      await groupMapService.deleteMany(id);
      await groupMapService.createMany(id, data.maps as number[]);

      return this.buildGroup(await groupRepository.getGroupById(id));
    }
  }

  override async create(data: CreateGroupDTO): Promise<any> {
    const groupCreated = await groupRepository.create({
      id_owner: data.id_owner,
      name: data.name,
    });

    if (groupCreated) {
      await userGroupService.createMany(groupCreated.id, data.users as number[]);

      await groupMapService.createMany(groupCreated.id, data.maps as number[]);

      return this.buildGroup(await groupRepository.getGroupById(groupCreated.id));
    }
  }
}

export const groupService = new GroupService(groupRepository);
