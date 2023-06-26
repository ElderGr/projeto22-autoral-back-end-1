import { productsRoutes } from "./products.routes";
import { Router } from "express";
import { userRoutes } from "./users.routes";
import { cartRouter } from "./cart.routes";

const router = Router();

router
  .use("/products", productsRoutes)
  .use("/user", userRoutes)
  .use("/cart", cartRouter);

export default router;
