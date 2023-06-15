import { productsRoutes } from "./products.routes";
import { Router } from "express";

const router = Router();

router.use([productsRoutes])

export default router