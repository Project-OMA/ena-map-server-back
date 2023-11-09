import User, { CreateUserDTO, UpdateUserDTO, UserDTO } from '../entities/User';
import dao, { models } from '../config/dao';
import { CrudRepository } from './CrudRepository';
import { PagedList } from '../types/pagedList';
import { PrismaPaginationQuery } from '../types/prismaPaginationQuery';

const select = {
  id: true,
  name: true,
  email: true,
  type: true,
  sub: true,
  created_at: true,
  updated_at: true
};
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
      select,
    });
  }

  public async findAll(query: string) {
    return models.map.findMany({ select });
  }

  public async findAllPaged(page: string, limit: string, search: string, userTypes: Number[] | undefined = undefined): Promise<any> {
    let query: PrismaPaginationQuery = {
      select,
      orderBy: {
        created_at: "desc",
      },
    }

    if(search) query.where = {  name: { contains: search } }
    
    let skip: number | null = null;
    let take: number | null = null;
    if(page || limit){
      take = Number(limit)
      skip = (Number(page) - 1) * take
      query.skip = skip
      query.take = take
    }

    if (userTypes && Array.isArray(userTypes) && userTypes.length > 0) {
      query.where = {
        AND: [
          {
            type: {
              in: userTypes
            }
          },
          query.where
        ]
      };
    }

    return {
      users: await models.user.findMany(query),
      count: await models.user.count({where: query.where, skip, take})
    }
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
