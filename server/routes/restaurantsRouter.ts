import { Router } from "express";
import {restaurantsController} from '../controller/restaurantsController'

//define router
const restaurantsRouter = Router();

//define routes from controller
restaurantsRouter.post('/', restaurantsController.createRestaurant);
restaurantsRouter.get('/', restaurantsController.getRestaurants);
restaurantsRouter.get('/:id', restaurantsController.getRestaurant);
restaurantsRouter.put('/:id', restaurantsController.updateRestaurant);
restaurantsRouter.delete('/:id', restaurantsController.deleteRestaurant);

//add review to a specific restaurant
restaurantsRouter.post('/:id/addReview', restaurantsController.addReviewToRestaurant)

export default restaurantsRouter;
