import { CrudRepository } from './CrudRepository';
import { CreateUserGroupDTO, UpdateUserGroupDTO, UserGroupDTO } from '../entities/UserGroup';

class UserGroupRepository extends CrudRepository<UserGroupDTO, CreateUserGroupDTO, UpdateUserGroupDTO> {}

export const userGroupRepository = new UserGroupRepository('userGroup', 'id_group');
