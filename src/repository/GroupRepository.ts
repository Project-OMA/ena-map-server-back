import { models } from '../config/dao';
import { Group } from '@prisma/client';
import { CreateGroup, UpdateGroup } from '../entities/Group';

class GroupRepository {
  idKey: string;

  constructor() {
    this.idKey = 'id';
  }

  async findAll(): Promise<Group[]> {
    return await models.group.findMany();
  }
  
  async findByOwnerId(id: number): Promise<Group[]> {
    return await models.group.findMany({ where: { id } });
  }

  async findById(id: number): Promise<Group | null> {
    return await models.group.findUnique({ where: { id: id } });
  }

  async create(data: CreateGroup): Promise<Group> {
    return await models.group.create({ data });
  }

  async delete(id: number): Promise<Group> {
    return await models.group.delete({ where: { [this.idKey]: id } });
  }

  async update(id: number, data: UpdateGroup): Promise<Group> {
    return await models.group.update({ where: { [this.idKey]: id }, data });
  }
}

export default GroupRepository;
