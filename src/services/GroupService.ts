import { CrudService } from './CrudService';
import AppError from '../errors/AppError';
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from '../entities/Group';
import { groupRepository } from '../repository/GroupRepository';
import { userService } from './UserService';

class GroupService extends CrudService<GroupDTO, CreateGroupDTO, UpdateGroupDTO> {

  async createWithUsers(data: CreateGroupDTO): Promise<any> {
    const [groupByName] = await groupRepository.getByName(data.name || "");
    if(groupByName){
      throw new AppError(400, 'Erro! Grupo já cadastrado');
    }

    return await groupRepository.createWithUsers(data);
  }

  async updateWithUsersAndMaps(id: number, data: UpdateGroupDTO): Promise<any> {
    const [groupByName] = await groupRepository.getByName(data.name || "");
    if(groupByName && groupByName.id !== id){
      throw new AppError(400, 'Erro! Grupo já cadastrado');
    }

    return await groupRepository.updateWithUsersAndMaps(id, data);
  }

}

export const groupService = new GroupService(groupRepository);
