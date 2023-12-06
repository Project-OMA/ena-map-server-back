import { Router } from 'express';
import { mapController } from '../../controllers/v1/MapController';
import { expressValidator, validators } from '../../middlewares/validators/validator';
import { authorizateUser } from '../../middlewares/AuthorizateUser';
import UserTypes from '../../constants/UserTypes';
import multer from 'multer';
import { handlerFileMap } from '../../middlewares/fileHandler';

const ADMIN = UserTypes.ADMIN;
const TEACHER = UserTypes.TEACHER;
const STUDENT = UserTypes.STUDENT;

const routes = Router();

routes.route('/listAll').get(validators.paginationValidator, mapController.listAll);
routes.route('/').get(validators.paginationValidator, mapController.findAllPaged);

routes
  .route('/group_id/:id')
  .get(authorizateUser([ADMIN, TEACHER, STUDENT]), validators.idParamValidator, mapController.getByGroupId);

routes
  .route('/:id')
  .put(authorizateUser([ADMIN, TEACHER]), multer().array('file'),
  handlerFileMap,
  validators.mapValidator.update,
  expressValidator, 
  mapController.update
);

routes.route('/search').get(authorizateUser([ADMIN, TEACHER]), mapController.getMapsByName);

routes
  .route('/')
  .post(
    authorizateUser([ADMIN, TEACHER]),
    multer().array('file'),
    handlerFileMap,
    validators.mapValidator.create,
    expressValidator,
    mapController.create,
  );

routes.route('/:id').get(validators.idParamValidator, mapController.getById);

routes.route('/:id/download/public').get(validators.idParamValidator, mapController.downloadMap);

routes.route('/convert_xml').post(multer().array('file'), handlerFileMap, mapController.convertXmlFile);

// routes.route('/:id').delete(validators.idParamValidator, mapController.delete);

const mapRouter = routes;

export default mapRouter;
