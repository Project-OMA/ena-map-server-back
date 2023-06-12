import { Router } from 'express';
import { userController } from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import authorizeUser from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';
import upload from '../../middlewares/CSVMulterConfig';

const ADMIN = UserTypes.ADMIN;
const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/').get(authorizeUser([ADMIN, TEACHER]), userController.listAll);

routes.route('/group_id/:id').get(authorizeUser([ADMIN, TEACHER, STUDENT]), validators.idParamValidator, userController.getByGroupId);

routes.route('/').post(authorizeUser([ADMIN, TEACHER]), validators.userValidator.create, expressValidator, userController.create);

routes.route('/auth').post(validators.userValidator.auth, expressValidator, userController.authenticate);

routes.route('/:id').get(authorizeUser([ADMIN, TEACHER]), validators.idParamValidator, userController.getById);

routes.route('/:id').put(authorizeUser([ADMIN, TEACHER]), validators.userValidator.update, expressValidator, userController.update);

routes.route('/file').post(authorizeUser([ADMIN, TEACHER]), upload.single('tb_users'), userController.createByFile);

const userRouter = routes;

export default userRouter;
