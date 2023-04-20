import User, { CreateUser, UpdateUser } from '../entities/User';
import { models } from '../config/dao';

class UserRepository {
  idKey: string;

  constructor() {
    this.idKey = 'id';
  }

  async findAll(): Promise<User[]> {
    return await models.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return await models.user.findUnique({ where: { id: id } });
  }

  async create(data: CreateUser): Promise<User> {
    return await models.user.create({ data });
  }

  async delete(id: number): Promise<User> {
    return await models.user.delete({ where: { [this.idKey]: id } });
  }

  async update(id: number, data: UpdateUser): Promise<User> {
    return await models.user.update({ where: { [this.idKey]: id }, data });
  }
}

export default UserRepository;
