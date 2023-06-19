import { productsRoutes } from "./products.routes";
import { Router } from "express";
import { userRoutes } from "./users.routes";

const router = Router();

router
    .use('/products', productsRoutes)
    .use('/user', userRoutes)

export default router