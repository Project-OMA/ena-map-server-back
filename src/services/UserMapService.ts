import { CrudService } from './CrudService';
import { CreateUserMapDTO, UpdateUserMapDTO, UserMapDTO } from '../entities/UserMap';
import { userMapRepository } from '../repository/UserMapRepository';
import { userRepository } from '../repository/UserRepository';

class UserMapService extends CrudService<UserMapDTO, CreateUserMapDTO, UpdateUserMapDTO> {
  async createMany(mapIds: number[], users: number[]) {
    for (const idUser of users) {
      for (const idMap of mapIds) {
        const userMapRelation = await userMapRepository.getByMapAndUser(idMap, idUser);
        // if there is a user relation with the map it wont create a new one
        if(userMapRelation.length < 1) {
          await userMapRepository.create({
            id_map: idMap,
            id_user: idUser,
            in_completed: false
          });
        }
      }
    }
  }

  // async deleteMany(groupId: number) {
  //   await userMapRepository.deleteMany(groupId);
  // }


  public async updateByUser(email: string, mapId: number):Promise<any> {

    const [userSelected] = await userRepository.getUserByEmail(email);

    if(!userSelected){
      throw new Error('User not found.');
    }    

    await userMapRepository.updateByUserAndMap(mapId, userSelected.id, {
      in_completed: true
    })

    return {
      status: 'success'
    };
  }
}

export const userMapService = new UserMapService(userMapRepository);
