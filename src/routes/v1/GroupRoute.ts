import { Router } from 'express';
import GroupController from '../../controllers/v1/GroupController';
import { expressValidator, validators } from '../../middlewares/validators/validator';

const routes = Router();

routes.route('/').get(GroupController.findAll);
routes.route('/').post(validators.groupValidator.create, expressValidator, GroupController.create);
routes.route('/:id').get(validators.idParamValidator, expressValidator, GroupController.findById);routes.route('/:id').get(validators.idParamValidator, expressValidator, GroupController.findById);
routes.route('/owner/:id').get(validators.idParamValidator, expressValidator, GroupController.findByOwnerId);
routes.route('/:id').put(validators.idParamValidator, validators.groupValidator.update, expressValidator, GroupController.update);
routes.route('/:id').delete(validators.idParamValidator, expressValidator, GroupController.delete);

const groupRouter = routes;

export default groupRouter;
