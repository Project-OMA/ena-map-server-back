import User from '../entities/User';
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
}

export default UserRepository;
