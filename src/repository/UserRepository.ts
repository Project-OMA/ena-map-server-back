import User, { CreateUserDTO, UpdateUserDTO, UserDTO } from '../entities/User';
import { models } from '../config/dao';
import { CrudRepository } from './CrudRepository';

class UserRepository extends CrudRepository<UserDTO, CreateUserDTO, UpdateUserDTO> {
  public async getUserByEmail(email: string): Promise<UserDTO[]> {
    return models.user.findMany({
      where: {
        email: {
          equals: email,
        },
      },
    });
  }
}

export const userRepository = new UserRepository('user', 'id');
