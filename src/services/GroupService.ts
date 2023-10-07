import { CrudService } from './CrudService';
import AppError from '../errors/AppError';
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from '../entities/Group';
import { groupRepository } from '../repository/GroupRepository';
import { userService } from './UserService';
import { userGroupService } from './UserGroupService';
import { groupMapService } from './GroupMapService';
import { userMapService } from './UserMapService';
import { userRepository } from '../repository/UserRepository';

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

  public override async getById(id: number): Promise<GroupDTO | null> {
    return this.buildGroup(await groupRepository.getById(id));
  }

  public async getMapsByGroup(id: number): Promise<any> {
    const result = await groupMapService.getMapsByGroup(id);

    if (result.length > 0) {
      const resultFormated = result.map((item) => {
        return {
          id_professor: item.id_owner,
          id_mapa: item.id_map,
          mapa_json: JSON.parse(item.tag),
        };
      });

      return resultFormated;
    }

    throw new Error(`Group hasn't maps`);
  }

  private buildGroup(data: any): any {
    console.log('data.rel_group_map', data);
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

      return this.buildGroup(await groupRepository.getById(id));
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

      await userMapService.createMany(data.maps as number[], data.users as number[]);

      return this.buildGroup(await groupRepository.getById(groupCreated.id));
    }
  }


  public async getGroupMapByUser(email: string):Promise<any> {

    const [userSelected] = await userRepository.getUserByEmail(email);

    if(!userSelected){
      throw new Error('User not found.');
    }    

    const [mapResponse] = await groupRepository.getGroupMapByUser(userSelected.id);

    if(!mapResponse) {
      throw new Error('No Map left');
    }

    return {
      id_map: mapResponse.id,
      id_user: userSelected.id,
      id_owner: mapResponse.id_owner,
      name: mapResponse.name,
      json: mapResponse.tag
    };

  }

}

export const groupService = new GroupService(groupRepository);
