import { Router } from 'express';
import UserController from '../../controllers/v1/UserController';
import { expressValidator, validators } from '../../middlewares/validators/validator';

const routes = Router();

routes.route('/').get(UserController.findAll);
routes.route('/:id').get(validators.idParamValidator, expressValidator, UserController.findById);

const userRouter = routes;

export default userRouter;
