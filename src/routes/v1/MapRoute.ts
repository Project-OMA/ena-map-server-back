import { Router } from 'express';
import { mapController } from '../../controllers/v1/MapController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import authorizeUser from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';

const TEACHER = UserTypes.TEACHER;

const routes = Router();

routes.route('/').get(mapController.listAll);

routes.route('/').post(authorizeUser([TEACHER]), validators.mapValidator.create, expressValidator, mapController.create);

routes.route('/:id').get(validators.idParamValidator, mapController.getById);

routes.route('/:id').put(authorizeUser([TEACHER]), validators.mapValidator.update, expressValidator, mapController.update);

// routes.route('/:id').delete(validators.idParamValidator, mapController.delete);

const mapRouter = routes;

export default mapRouter;
