import { createUser } from "@/controllers/users.controller";
import validateFirebaseToken from "@/middlewares/ValidateFirebaseToken.middleware";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("", validateFirebaseToken, createUser);

export { userRoutes };
