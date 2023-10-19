import { Router } from 'express';
import userRouter from './UserRoute';
import mapRouter from './MapRoute';
import {groupRouter, groupPubRouter} from './GroupRoute';

export const routes = Router();
export const pubRoutes = Router();

routes.use('/users', userRouter);
routes.use('/maps', mapRouter);
routes.use('/groups', groupRouter);


pubRoutes.use('/groups', groupPubRouter);

