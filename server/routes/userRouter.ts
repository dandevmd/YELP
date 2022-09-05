import { Router } from "express";
import { userController } from "../controller/userController";
import authMiddleware from "../midlewares/authMiddleware";

//define router
const userRouter = Router();

//define routes for userRouter
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/auth", userController.auth);

export default userRouter;
