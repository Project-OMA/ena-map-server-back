import { userRepository } from '../repository/UserRepository';
import { CrudService } from './CrudService';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from '../entities/User';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { IAuthenticate } from '../types/userTypes';
import { JWT_SECRET } from '../constants/EnvironmentVariables';
import AppError from '../errors/AppError';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserToken } from '../types/UserToken';
class UserService extends CrudService<UserDTO, CreateUserDTO, UpdateUserDTO> {

  override async create(data: CreateUserDTO): Promise<any> {
    const [userByEmail] = await userRepository.getUserByEmail(data.email);
    if(userByEmail){
      throw new AppError(400, 'Erro! E-mail já cadastrado');
    }

    const { password } = data;
    const passwordHash = await hash(password, 8);

    return await userRepository.create({ ...data, password: passwordHash })
      .then(user => user && {...user, password: undefined});
  }

  override async update(id: number, data: CreateUserDTO): Promise<any> {
    const [userByEmail] = await userRepository.getUserByEmail(data.email);
    if(userByEmail && userByEmail.id !== id){
      throw new AppError(400, 'Erro! E-mail já cadastrado');
    }

    const { password } = data;
    const passwordHash = await hash(password, 8);

    return await userRepository.create({ ...data, password: passwordHash })
      .then(user => user && {...user, password: undefined});
  }

  override async listAll(): Promise<any | null> {
    return await userRepository.listAll();
  }

  override async getById(id: number) {
    const user: any = await userRepository.getById(id);
    if (!user || !user.id) {
      throw new AppError(404, 'Erro! Usuário não encontrado');
    }
    return user;
  }

  async getByGroupId(id: number) {
    return await userRepository.getByGroupId(id);
  }

  async authenticate(data: IAuthenticate): Promise<any> {
    const { email, password } = data;

    const [userSelected] = await userRepository.getUserByEmail(email);

    if (!userSelected) {
      throw new Error('Erro! E-mail e/ou senha incorreto');
    }

    const isPasswordValid = await compare(password, userSelected.password);

    if (!isPasswordValid) {
      throw new Error('Erro! E-mail e/ou senha incorreto');
    }

    const token = sign(
      {
        id: userSelected.id,
        sub: userSelected.sub,
        email: userSelected.email,
        name: userSelected.name,
        type: userSelected.type,
      },
      JWT_SECRET,
      {
        expiresIn: '13h',
      },
    );

    return { access_token: token };
  }

  async getUserByToken(requestToken: string): Promise<UserDTO> {
    try{
      if(!requestToken){
        throw new AppError(401, "Não autenticado! Token não encontrado")
      }

      const token: string = requestToken.substring(7);

      const decodedUserData: UserToken = jwt.verify(token, JWT_SECRET) as UserToken;

      if(!decodedUserData || !decodedUserData.id){
        throw new AppError(401, "Não autenticado! Usuário não encontrado")
      }
      
      let user: UserDTO | null = await userRepository.getById(decodedUserData.id);

      if(!user){
        throw new AppError(401, "Não autenticado! Usuário não encontrado")
      }
      return user;

    } catch(error){ 
      if(error instanceof AppError){
        throw error;
      }
      throw new AppError(401, "Não autenticado! Ocorreu um erro inesperado. " + error)
    }
  }
}

export const userService = new UserService(userRepository);
