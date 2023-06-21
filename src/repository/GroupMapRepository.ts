import { CrudRepository } from './CrudRepository';
import { CreateUserGroupDTO, UpdateUserGroupDTO, UserGroupDTO } from '../entities/UserGroup';
import { CreateGroupMapDTO, GroupMapDTO, UpdateGroupMapDTO } from '../entities/GroupMap';

class GroupMapRepository extends CrudRepository<GroupMapDTO, CreateGroupMapDTO, UpdateGroupMapDTO> {}

export const groupMapRepository = new GroupMapRepository('groupMap', 'id_group');
