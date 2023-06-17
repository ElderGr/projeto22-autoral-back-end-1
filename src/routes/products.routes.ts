import { validateBody } from "@/middlewares/validateSchema.middleware";
import {
  createProduct,
  getProducts,
  getProductsByCategory,
  updateProductQuantity,
} from "../controllers/products.controller";
import { Router } from "express";
import { new_product_schema } from "@/schemas/products.schema";

const productsRoutes = Router();

productsRoutes.get("", getProducts);
productsRoutes.get("/:category", getProductsByCategory);
productsRoutes.post("/create", validateBody(new_product_schema), createProduct);
productsRoutes.put("/quantity", updateProductQuantity);

export { productsRoutes };
