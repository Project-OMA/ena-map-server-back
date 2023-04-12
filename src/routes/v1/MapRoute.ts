import { Router } from 'express';
import MapController from '../../controllers/v1/MapController';
import { expressValidator, validators } from '../../middlewares/validators/validator';

const routes = Router();

routes.route('/').get(MapController.findAll);

routes.route('/').post(validators.mapValidator.create, expressValidator, MapController.create);

routes.route('/:id').get(validators.idParamValidator, MapController.findById);

routes.route('/:id').put(validators.mapValidator.update, expressValidator, MapController.update);

routes.route('/:id').delete(validators.idParamValidator, MapController.delete);

const mapRouter = routes;

export default mapRouter;
