import { Router } from 'express';
import UserController from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';

const routes = Router();

routes.route('/').get(UserController.findAll);
routes.route('/').post(validators.userValidator.create, expressValidator, UserController.create);
routes.route('/:id').get(validators.idParamValidator, expressValidator, UserController.findById);
routes.route('/:id').put(validators.idParamValidator, validators.userValidator.update, expressValidator, UserController.update);
routes.route('/:id').delete(validators.idParamValidator, expressValidator, UserController.delete);

const userRouter = routes;

export default userRouter;
