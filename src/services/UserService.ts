import UserRepository from '../repository/UserRepository';
import AppError from '../errors/AppError';
import { CreateUser, ReadUser, UpdateUser } from '../entities/User';
import { User } from '@prisma/client';

class UserService {
  userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findAll() : Promise<ReadUser[]> {
    return (await this.userRepository.findAll()).map(u => ({...u, password: ""}));
  }

  async findById(id: number): Promise<ReadUser> {
    const user: User | null = await this.userRepository.findById(id);
    if (!user || !user.id) {
      throw new AppError(404, 'User not found');
    }
    return {...user, password: ""};
  }

  async create(data: CreateUser): Promise<ReadUser> {
    const user = await this.userRepository.create(data);
    return {...user, password: ""}
  }

  async update(id: number, data: UpdateUser): Promise<ReadUser> {
    await this.findById(id);
    return await this.userRepository.update(id, data);
  }

  async delete(id: number): Promise<ReadUser> {
    await this.findById(id);
    return await this.userRepository.delete(id);
  }
}

export default new UserService();
