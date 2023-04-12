import { Router } from 'express';
import userRouter from './UserRoute';
import mapRouter from './MapRoute';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/maps', mapRouter);

export default routes;
