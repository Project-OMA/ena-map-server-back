import { CrudRepository } from './CrudRepository';
import { CreateUserMapDTO, UpdateUserMapDTO, UserMapDTO } from '../entities/UserMap';
import { models } from '../config/dao';

class UserMapRepository extends CrudRepository<UserMapDTO, CreateUserMapDTO, UpdateUserMapDTO> {

 
 public async updateByUserAndMap(idMap: number, idUser: number, data: UpdateUserMapDTO): Promise<UserMapDTO | null> {
    console.log(idMap, idUser)
    return models.userMap.updateMany({ where: { id_map: idMap, id_user: idUser}, data });
 }

 public async getByMapAndUser(idMap: number, idUser: number){
    return models.userMap.findMany({
        where: {
            id_user: idUser,
            id_map: idMap
        },
        select: {
            id_user: true,
            id_map: true,
            in_completed: true,
        }
    })
 }
}

export const userMapRepository = new UserMapRepository('userMap', 'id_map');

