import { Router } from 'express';
import { mapController } from '../../controllers/v1/MapController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import authorizeUser from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';
import multer from 'multer';
import { handlerFileMap } from '../../middlewares/fileHandler';

const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/').get(mapController.listAll);

routes
  .route('/group_id/:id')
  .get(authorizeUser([TEACHER, STUDENT]), validators.idParamValidator, mapController.getByGroupId);

routes.route('/').post(
  // authorizeUser([TEACHER]),
  multer().array('file'),
  handlerFileMap,
  validators.mapValidator.create,
  expressValidator,
  mapController.create,
);

routes.route('/:id').get(validators.idParamValidator, mapController.getById);

routes
  .route('/:id')
  .put(authorizeUser([TEACHER]), validators.mapValidator.update, expressValidator, mapController.update);

routes.route('/convert_xml').post(multer().array('file'), handlerFileMap, mapController.convertXmlFile);

// routes.route('/:id').delete(validators.idParamValidator, mapController.delete);

const mapRouter = routes;

export default mapRouter;
