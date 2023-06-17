import { productsRoutes } from "./products.routes";
import { Router } from "express";

const router = Router();

router
    .use('/products', productsRoutes)

export default router