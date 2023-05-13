import { Router } from 'express';
import { userController } from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import authorizeUser from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';

const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/').get(authorizeUser([TEACHER]), userController.listAll);

routes.route('/group_id/:id').get(authorizeUser([TEACHER, STUDENT]), validators.idParamValidator, userController.getByGroupId);

routes.route('/').post(authorizeUser([TEACHER]), validators.userValidator.create, expressValidator, userController.create);

routes.route('/auth').post(validators.userValidator.auth, expressValidator, userController.authenticate);

routes.route('/:id').get(authorizeUser([TEACHER]), validators.idParamValidator, userController.getById);

routes.route('/:id').put(authorizeUser([TEACHER]), validators.userValidator.update, expressValidator, userController.update);

const userRouter = routes;

export default userRouter;
