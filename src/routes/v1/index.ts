import { Router } from 'express';
import UserController from '../../controllers/v1/UserController';

const routes = Router();

routes.get("/users", UserController.findAll);
routes.get("/users/:id", UserController.findById);

export default routes;
