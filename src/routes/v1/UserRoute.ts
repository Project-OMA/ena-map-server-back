import { Router } from 'express';
import { userController } from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';

const routes = Router();

routes.route('/').get(userController.listAll);

routes.route('/').post(validators.userValidator.create, expressValidator, userController.create);

routes.route('/auth').post(validators.userValidator.auth, expressValidator, userController.authenticate);

routes.route('/:id').get(validators.idParamValidator, userController.getById);

routes.route('/:id').put(validators.userValidator.update, expressValidator, userController.update);

const userRouter = routes;

export default userRouter;
