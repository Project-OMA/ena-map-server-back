import { Router } from 'express';
import { userController } from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import { authorizateUser } from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';
import { groupController } from '../../controllers/v1/GroupController';

const ADMIN = UserTypes.ADMIN;
const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();
const pubRoutes = Router();

routes.route('/listAll').get(authorizateUser([ADMIN, TEACHER]), groupController.listAll);

routes.route('/users/:userId/groups')
  .get(
    validators.userIdParamValidator, 
    validators.paginationValidator, 
    groupController.findAllPagedByUserId
  )
;

routes.route('/').get(authorizateUser([ADMIN, TEACHER]), validators.paginationValidator, groupController.findAllPaged);

routes.route('/:idUser/by-user').get(authorizateUser([ADMIN, TEACHER,STUDENT]), validators.paginationValidator, groupController.findAllGroupsByUserPaged);

routes
  .route('/')
  .post(authorizateUser([ADMIN, TEACHER]), validators.groupValidator.create, expressValidator, groupController.create);

// routes
//   .route('/include/users/maps')
//   .post(
//     authorizateUser([ADMIN, TEACHER]),
//     validators.groupValidator.create,
//     expressValidator,
//     groupController.createWithUsers,
//   );

routes.route('/:id').get(authorizateUser([ADMIN, TEACHER, STUDENT]), validators.idParamValidator, groupController.getById);

routes.route('/:id/maps').get(validators.idParamValidator, groupController.getMapsFromGroup);

routes
  .route('/:id')
  .put(
    authorizateUser([ADMIN, TEACHER]),
    validators.groupValidator.update,
    expressValidator,
    groupController.updateGroup,
  );

routes
  .route('/:idGroup/user/:idUser')
  .get(
    validators.groupValidator.mapsByUser,
    expressValidator,
    groupController.getMapsFromGroupByUserAndGroup,
  );

routes.route('/:id').delete(validators.idParamValidator, groupController.delete);

pubRoutes
  .route('/next-map/:email')
  .get(
    validators.groupValidator.userMaps,
    expressValidator,
    groupController.getGroupMapByUser,
  );

pubRoutes
  .route('/:idMap/:email/save')
  .put(
    validators.groupValidator.updateMapUser,
    expressValidator,
    userController.updateMapUserByEmail,
  );


// routes
//   .route('/:id/include/users/maps')
//   .put(
//     authorizateUser([ADMIN, TEACHER]),
//     validators.groupValidator.update,
//     expressValidator,
//     groupController.updateWithUsersAndMaps,
//   );

export const groupRouter = routes;

export const groupPubRouter = pubRoutes;
