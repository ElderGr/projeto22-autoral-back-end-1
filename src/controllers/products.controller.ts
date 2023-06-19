import { newProduct, newProductBody } from "@/protocols/protocols";
import productsServices, { updateProductQuantityType } from "@/services/products.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = req.body as newProductBody;
  try {
    const new_product = await productsServices.createProduct(product);
    res.status(httpStatus.CREATED).send(new_product);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await productsServices.getProducts();
    res.send(products);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

export async function getProductsByCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { category } = req.params;
  try {
    const products = await productsServices.getProductsByCategory(category);
    res.send(products);
  } catch (e) {
    next(e);
  }
}

export async function updateProductQuantity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productQuantityInfo = req.body as updateProductQuantityType;
  try {
    const updated_product = await productsServices.updateProductQuantity(
      productQuantityInfo
    );
    res.send(updated_product);
  } catch (e) {
    console.log(e);
    next(e);
  }
}
