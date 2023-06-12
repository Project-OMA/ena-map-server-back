import { Router } from 'express';
import { mapController } from '../../controllers/v1/MapController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import authorizeUser from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';

const ADMIN = UserTypes.ADMIN;
const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/').get(mapController.listAll);

routes.route('/group_id/:id').get(authorizeUser([ADMIN, TEACHER, STUDENT]), validators.idParamValidator, mapController.getByGroupId);

routes.route('/').post(authorizeUser([ADMIN, TEACHER]), validators.mapValidator.create, expressValidator, mapController.create);

routes.route('/:id').get(validators.idParamValidator, mapController.getById);

routes.route('/:id').put(authorizeUser([ADMIN, TEACHER]), validators.mapValidator.update, expressValidator, mapController.update);

// routes.route('/:id').delete(validators.idParamValidator, mapController.delete);

const mapRouter = routes;

export default mapRouter;
