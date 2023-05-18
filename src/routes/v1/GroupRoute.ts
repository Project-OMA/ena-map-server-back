import { Router } from 'express';
import { userController } from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import authorizeUser from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';
import { groupController } from '../../controllers/v1/GroupController';

const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/').get(authorizeUser([TEACHER]), groupController.listAll);

routes.route('/').post(authorizeUser([TEACHER]), validators.groupValidator.create, expressValidator, groupController.create);

routes.route('/include/users/maps').post(authorizeUser([TEACHER]), validators.groupValidator.create, expressValidator, groupController.createWithUsers);

routes.route('/:id').get(authorizeUser([TEACHER]), validators.idParamValidator, groupController.getById);

routes.route('/:id').put(authorizeUser([TEACHER]), validators.groupValidator.update, expressValidator, groupController.update);

routes.route('/:id/include/users/maps').put(authorizeUser([TEACHER]), validators.groupValidator.update, expressValidator, groupController.updateWithUsersAndMaps);

const groupRouter = routes;

export default groupRouter;
