import { Router } from 'express';
import { userController } from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import authorizeUser from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';
import { groupController } from '../../controllers/v1/GroupController';

const ADMIN = UserTypes.ADMIN;
const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/').get(authorizeUser([ADMIN, TEACHER]), groupController.listAll);

routes.route('/').post(authorizeUser([ADMIN, TEACHER]), validators.groupValidator.create, expressValidator, groupController.create);

routes.route('/include/users/maps').post(authorizeUser([ADMIN, TEACHER]), validators.groupValidator.create, expressValidator, groupController.createWithUsers);

routes.route('/:id').get(authorizeUser([ADMIN, TEACHER]), validators.idParamValidator, groupController.getById);

routes.route('/:id').put(authorizeUser([ADMIN, TEACHER]), validators.groupValidator.update, expressValidator, groupController.update);

routes.route('/:id/include/users/maps').put(authorizeUser([ADMIN, TEACHER]), validators.groupValidator.update, expressValidator, groupController.updateWithUsersAndMaps);

const groupRouter = routes;

export default groupRouter;
