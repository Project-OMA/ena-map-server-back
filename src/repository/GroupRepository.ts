import dao, { models } from '../config/dao';
import { CrudRepository } from './CrudRepository';
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from '../entities/Group';
import { UserDTO } from '../entities/User';

class GroupRepository extends CrudRepository<GroupDTO, CreateGroupDTO, UpdateGroupDTO> {
    
  public async getByName(name: string): Promise<GroupDTO[]> {
      return models.group.findMany({
        where: {
          name: {
            equals: name,
          },
        },
      });
  }

  public async createWithUsers(data: CreateGroupDTO): Promise<GroupDTO> {
    return dao.$transaction(async (tx: any) => {
      let group: GroupDTO = await tx.group.create({ data: {...data, users: undefined} });

      // group = await tx.group.update({
      //   where: {id: group.id},
      //   data: {
      //     name: data.name,
      //     id_owner: data.id_owner,
      //     rel_user_group: {
      //       create: data.users?.map(id_user => ({UserGroup: {create: {id_user, id_group: group.id}}}))
      //     }
      //   }
      // })
      if(Array.isArray(data.users) && data.users.length > 0){
        data.users.forEach(async userId => {
          await tx.$executeRaw`INSERT INTO rel_user_group (id_user, id_group) VALUES (${userId}, ${group.id})`;
        })

        group.users = await tx.$queryRaw<UserDTO[]>`SELECT u.id, u.name, u.email, u.type, u.sub, u.created_at, u.updated_at FROM tb_user AS u JOIN rel_user_group AS rel ON rel.id_user = u.id`;
      }

      return group;
    })
  }

  public async updateWithUsers(id: number, data: UpdateGroupDTO): Promise<GroupDTO> {
    return dao.$transaction(async (tx: any) => {
      let group: GroupDTO = await tx.group.update({
          where: {id},
          data: {
            name: data.name,
            id_owner: data.id_owner,
            users: undefined
          }
      })
      
      if(Array.isArray(data.users) && data.users.length > 0){
        let currentUsers: number[] = (await tx.$queryRaw<UserDTO[]>`SELECT u.id FROM tb_user AS u JOIN rel_user_group AS rel ON rel.id_user = u.id`).map((u: UserDTO) => u.id);

        // Insert new users included
        data.users?.filter((u: number) => !currentUsers.includes(u))
          .forEach(async userId => {
            await tx.$executeRaw`INSERT INTO rel_user_group (id_user, id_group) VALUES (${userId}, ${group.id})`;
          })
        ;

        // Delete users not included
        currentUsers.filter((u: number) => !data.users?.includes(u))
          .forEach(async userId => {
            await tx.$executeRaw`DELETE FROM rel_user_group WHERE (id_user = ${userId} AND id_group = ${group.id})`;
          })
        ;

        group.users = await tx.$queryRaw<UserDTO[]>`SELECT u.id, u.name, u.email, u.type, u.sub, u.created_at, u.updated_at FROM tb_user AS u JOIN rel_user_group AS rel ON rel.id_user = u.id`;
      }

      return group;
    })  
    
  }
}

export const groupRepository = new GroupRepository('group', 'id');
