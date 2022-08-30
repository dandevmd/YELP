import { Router } from "express";
import restaurantsRouter from './restaurantsRouter'

// initialize router
const routes = Router();

//define routes from controller
routes.use('/restaurants', restaurantsRouter);


export default routes;
