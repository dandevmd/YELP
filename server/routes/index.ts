import { Router } from "express";
import restaurantsRouter from './restaurantsRouter'
import userRouter from './userRouter'

// initialize router
const routes = Router();

//define routes from controller
routes.use('/restaurants', restaurantsRouter);
routes.use('/user', userRouter);

export default routes;
