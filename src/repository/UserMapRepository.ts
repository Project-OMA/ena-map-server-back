import { CrudRepository } from './CrudRepository';
import { CreateUserMapDTO, UpdateUserMapDTO, UserMapDTO } from '../entities/UserMap';

class UserMapRepository extends CrudRepository<UserMapDTO, CreateUserMapDTO, UpdateUserMapDTO> {}

export const userMapRepository = new UserMapRepository('userMap', 'id_map');
