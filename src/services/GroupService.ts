import AppError from '../errors/AppError';
import { Group } from '@prisma/client';
import GroupRepository from '../repository/GroupRepository';
import { CreateGroup, UpdateGroup } from '../entities/Group';

class GroupService {
  groupRepository: GroupRepository;
  constructor() {
    this.groupRepository = new GroupRepository();
  }

  async findAll() : Promise<Group[]> {
    return await this.groupRepository.findAll();
  }

  async findByOwnerId(id: number) : Promise<Group[]> {
    return await this.groupRepository.findByOwnerId(id);
  }

  async findById(id: number): Promise<Group> {
    const group: Group | null = await this.groupRepository.findById(id);
    if (!group || !group.id) {
      throw new AppError(404, 'Group not found');
    }
    return group;
  }

  async create(data: CreateGroup): Promise<Group> {
    return await this.groupRepository.create(data);
  }

  async update(id: number, data: UpdateGroup): Promise<Group> {
    await this.findById(id);
    return await this.groupRepository.update(id, data);
  }

  async delete(id: number): Promise<Group> {
    await this.findById(id);
    return await this.groupRepository.delete(id);
  }
}

export default new GroupService();
