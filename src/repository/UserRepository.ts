import User, { CreateUserDTO, UpdateUserDTO, UserDTO } from '../entities/User';
import dao, { models } from '../config/dao';
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
  
  public override async getById(id: number){
    return await models.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        type: true,
        sub: true,
        created_at: true,
        updated_at: true
      },
    });
  }

  public override async listAll(): Promise<UserDTO[]> {
    return dao.$queryRaw<User[]>`SELECT id, name, email, type, sub, created_at, updated_at FROM tb_user`
  }

  public async getByGroupId(id: number): Promise<UserDTO[]> {
    return dao.$queryRaw<User[]>`SELECT U.id, U.name, U.email, U.type, U.sub, U.created_at, U.updated_at FROM tb_user AS U JOIN rel_user_group AS G ON G.id_user = U.id WHERE G.id_group = ${id}`
  }

  public async createList(data: CreateUserDTO[]): Promise<UserDTO[]> {
    return dao.$transaction(async (tx: any) => {
      return await tx.user.createMany({data});
    });
  }
}

export const userRepository = new UserRepository('user', 'id');
