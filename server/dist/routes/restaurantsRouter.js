"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurantsController_1 = require("../controller/restaurantsController");
//Put this inside restaurantsController function and manipulate the permission
// //@ts-ignore
// console.log(req.user, '++++++++++++++++++++++++++')
//define router
const restaurantsRouter = (0, express_1.Router)();
//define routes from controller
restaurantsRouter.post("/", restaurantsController_1.restaurantsController.createRestaurant);
restaurantsRouter.get("/", restaurantsController_1.restaurantsController.getRestaurants);
restaurantsRouter.get("/:id", restaurantsController_1.restaurantsController.getRestaurant);
restaurantsRouter.put("/:id", restaurantsController_1.restaurantsController.updateRestaurant);
restaurantsRouter.delete("/:id", restaurantsController_1.restaurantsController.deleteRestaurant);
//add review to a specific restaurant
restaurantsRouter.post("/:id/addReview", restaurantsController_1.restaurantsController.addReviewToRestaurant);
exports.default = restaurantsRouter;
