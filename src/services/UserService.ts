import { userRepository } from '../repository/UserRepository';
import { CrudService } from './CrudService';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../entities/User';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from '../types/userTypes';

class UserService extends CrudService<UserDTO, CreateUserDTO, UpdateUserDTO> {
  override async create(data: CreateUserDTO): Promise<any> {
    const { password } = data;
    const passwordHash = await hash(password, 8);

    return await userRepository.create({ ...data, password: passwordHash });
  }

  async authenticate(data: IAuthenticate): Promise<any> {
    const { email, password } = data;

    const [userSelected] = await userRepository.getUserByEmail(email);

    if (!userSelected) {
      throw new Error('Email or Pasword incorret');
    }

    const isPasswordValid = await compare(password, userSelected.password);

    if (!isPasswordValid) {
      throw new Error('Email or Pasword incorret');
    }

    const token = sign(
      {
        id: userSelected.id,
        sub: userSelected.sub,
        email: userSelected.email,
        name: userSelected.name,
        type: userSelected.type,
      },
      'be6ef6b3-d7ee-4f93-9121-19e44fb73720',
      {
        expiresIn: '13h',
      },
    );

    return { access_token: token };
  }
}

export const userService = new UserService(userRepository);
