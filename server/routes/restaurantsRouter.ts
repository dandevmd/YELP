import { Router } from "express";
import { restaurantsController } from "../controller/restaurantsController";

//use authMiddleware to get back the token and restrict the put and delete methods. (Permit only if post belong to user).Also post only if you are logged in.
import authMiddleware from "../midlewares/authMiddleware";

//Put this inside restaurantsController function and manipulate the permission
// //@ts-ignore
// console.log(req.user, '++++++++++++++++++++++++++')

//define router
const restaurantsRouter = Router();

//define routes from controller
restaurantsRouter.post("/", restaurantsController.createRestaurant);
restaurantsRouter.get("/", restaurantsController.getRestaurants);
restaurantsRouter.get("/:id", restaurantsController.getRestaurant);
restaurantsRouter.put("/:id", restaurantsController.updateRestaurant);
restaurantsRouter.delete("/:id", restaurantsController.deleteRestaurant);

//add review to a specific restaurant
restaurantsRouter.post(
  "/:id/addReview",
  restaurantsController.addReviewToRestaurant
);

export default restaurantsRouter;
