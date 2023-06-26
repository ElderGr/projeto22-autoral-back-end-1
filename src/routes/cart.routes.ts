import { Router } from "express";
import * as cartController from "@/controllers/cart.controller"
import validateFirebaseToken from "@/middlewares/ValidateFirebaseToken.middleware";

const cartRouter = Router();

cartRouter.post("/", validateFirebaseToken, cartController.createCartItem);
cartRouter.get("/", validateFirebaseToken, cartController.getAllCartItems);
cartRouter.put("/", validateFirebaseToken, cartController.updateCartItemQuantity);
cartRouter.delete("/", validateFirebaseToken, cartController.deleteCartItem);

export { cartRouter };
