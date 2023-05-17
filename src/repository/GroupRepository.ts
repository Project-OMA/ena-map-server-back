import dao, { models } from '../config/dao';
import { CrudRepository } from './CrudRepository';
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from '../entities/Group';
import { UserDTO } from '../entities/User';
import { MapDTO } from '../entities/Map';

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

  override async getById(id: number): Promise<GroupDTO | null> {
    let group: GroupDTO = await models.group.findUnique({ where: { id } });

    if(group){
      group.maps = await dao.$queryRaw<MapDTO[]>`SELECT m.id, m.name, m.id_owner, m.url, m.thumb_url, m.tag, m.created_at, m.updated_at FROM tb_map AS m JOIN rel_group_map AS rel ON rel.id_map = m.id WHERE rel.id_group = ${group.id}`;
      group.users = await dao.$queryRaw<UserDTO[]>`SELECT u.id, u.name, u.email, u.type, u.sub, u.created_at, u.updated_at FROM tb_user AS u JOIN rel_user_group AS rel ON rel.id_user = u.id WHERE rel.id_group = ${group.id}`;
    }
    return group;
  }

  public async createWithUsers(data: CreateGroupDTO): Promise<GroupDTO> {
    return dao.$transaction(async (tx: any) => {
      let group: GroupDTO = await tx.group.create({ data: {...data, users: undefined, maps: undefined} });

      if(Array.isArray(data.maps) && data.maps.length > 0){
        data.maps?.forEach(async (mapId, index) => {
          await tx.groupMap.create({
            data: {
              id_map: mapId,
              id_group: group.id,
              order: ''+index
            }
          })
        });

        group.maps = await tx.$queryRaw<MapDTO[]>`SELECT m.id, m.name, m.id_owner, m.url, m.thumb_url, m.tag, m.created_at, m.updated_at FROM tb_map AS m JOIN rel_group_map AS rel ON rel.id_map = m.id WHERE rel.id_group = ${group.id}`;
      }
      
      if(Array.isArray(data.users) && data.users.length > 0){
        data.users?.forEach(async userId => {
          await tx.userGroup.create({
            data: {
              id_user: userId,
              id_group: group.id
            }
          })
        })

        group.users = await tx.$queryRaw<UserDTO[]>`SELECT u.id, u.name, u.email, u.type, u.sub, u.created_at, u.updated_at FROM tb_user AS u JOIN rel_user_group AS rel ON rel.id_user = u.id WHERE rel.id_group = ${group.id}`;
      }

      return group;
    })
  }

  public async updateWithUsersAndMaps(id: number, data: UpdateGroupDTO): Promise<GroupDTO> {
    return dao.$transaction(async (tx: any) => {
      let group: GroupDTO = await tx.group.update({
          where: {id},
          data: {
            name: data.name,
            id_owner: data.id_owner,
            users: undefined,
            maps: undefined
          }
      })
      
      if(Array.isArray(data.maps) && data.maps.length > 0){
        let currentMaps: number[] = (await tx.$queryRaw<MapDTO[]>`SELECT m.id FROM tb_map AS m JOIN rel_group_map AS rel ON rel.id_map = m.id WHERE rel.id_group = ${group.id}`).map((m: MapDTO) => m.id);
        
        // Insert new users included
        data.maps?.filter((m: number) => !currentMaps.includes(m))
          .forEach(async (mapId, index) => {
            await tx.groupMap.create({
              data: {
                id_map: mapId,
                id_group: group.id,
                order: ''+index
              }
            })
          })
        ;

        // Delete users not included
        currentMaps.filter((m: number) => !data.maps?.includes(m))
          .forEach(async mapId => {
            await tx.$executeRaw`DELETE FROM rel_group_map WHERE (id_map = ${mapId} AND id_group = ${group.id})`;
          })
        ;

      }

      if(Array.isArray(data.users) && data.users.length > 0){
        let currentUsers: number[] = (await tx.$queryRaw<UserDTO[]>`SELECT u.id FROM tb_user AS u JOIN rel_user_group AS rel ON rel.id_user = u.id WHERE rel.id_group = ${group.id}`).map((u: UserDTO) => u.id);

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

      }
      group.users = await tx.$queryRaw<UserDTO[]>`SELECT u.id, u.name, u.email, u.type, u.sub, u.created_at, u.updated_at FROM tb_user AS u JOIN rel_user_group AS rel ON rel.id_user = u.id WHERE rel.id_group = ${group.id}`;
      group.maps = await tx.$queryRaw<MapDTO[]>`SELECT m.id, m.name, m.id_owner, m.url, m.thumb_url, m.tag, m.created_at, m.updated_at FROM tb_map AS m JOIN rel_group_map AS rel ON rel.id_map = m.id WHERE rel.id_group = ${group.id}`;

      return group;
    })  
    
  }
}

export const groupRepository = new GroupRepository('group', 'id');
