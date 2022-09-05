"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
//define router
const userRouter = (0, express_1.Router)();
//define routes for userRouter
userRouter.post("/register", userController_1.userController.register);
userRouter.post("/login", userController_1.userController.login);
userRouter.get("/auth", userController_1.userController.auth);
exports.default = userRouter;
