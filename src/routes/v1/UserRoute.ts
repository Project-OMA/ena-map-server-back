import { Router } from 'express';
import { userController } from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import { authorizateUser } from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';
import upload from '../../middlewares/CSVMulterConfig';

const ADMIN = UserTypes.ADMIN;
const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/listAll').get(authorizateUser([ADMIN, TEACHER]), userController.listAll);
routes.route('/').get(authorizateUser([ADMIN, TEACHER]), validators.paginationValidator, userController.findAllPaged);

routes
  .route('/group_id/:id')
  .get(authorizateUser([ADMIN, TEACHER, STUDENT]), validators.idParamValidator, userController.getByGroupId);

routes
  .route('/')
  .post(authorizateUser([ADMIN, TEACHER]), validators.userValidator.create, expressValidator, userController.create);

routes.route('/auth').post(validators.userValidator.auth, expressValidator, userController.authenticate);

routes.route('/check-auth').get(userController.checkAuth);

routes.route('/:id').get(authorizateUser([ADMIN, TEACHER]), validators.idParamValidator, userController.getById);

routes
  .route('/:id')
  .put(authorizateUser([ADMIN, TEACHER]), validators.userValidator.update, expressValidator, userController.update);

routes.route('/file').post(authorizateUser([ADMIN, TEACHER]), upload.single('tb_users'), userController.createByFile);

const userRouter = routes;

export default userRouter;
