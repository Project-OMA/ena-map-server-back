import { Router } from 'express';
import userRouter from './UserRoute';
import mapRouter from './MapRoute';
import groupRouter from './GroupRoute';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/maps', mapRouter);
routes.use('/groups', groupRouter);

export default routes;
