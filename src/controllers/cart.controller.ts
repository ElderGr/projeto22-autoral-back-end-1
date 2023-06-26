import { unathorizedError } from "@/errors/unauthorizedError";
import cartRepository from "@/repositories/cart.repository";
import cartServices from "@/services/cart.service";
import userService from "@/services/users.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function createCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { product_id } = req.body as { product_id: number };
  try {
    if (!req.userId) throw unathorizedError();
    const new_cart_item = cartServices.createCartItem(req.userId, product_id);
    res.status(httpStatus.CREATED).send(new_cart_item);
  } catch (e) {
    next(e);
  }
}

export async function getAllCartItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.userId) throw unathorizedError();
    const cart_items = cartServices.getAllCartItems(req.userId);
    res.status(httpStatus.OK).send(cart_items);
  } catch (e) {
    next(e);
  }
}

export async function updateCartItemQuantity(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cart_item_id, quantity } = req.body as {
    cart_item_id: number;
    quantity: number;
  };
  try {
    const updated_item = await cartServices.updateCartItemQuantity(
      cart_item_id,
      quantity
    );
    res.status(httpStatus.OK).send(updated_item);
  } catch (e) {
    next(e);
  }
}

export async function deleteCartItem(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { cart_item_id } = req.body as {
    cart_item_id: number;
  };
  try {
    const deleted_item = cartRepository.deleteCartItem(cart_item_id);
    res.status(204).send(deleted_item);
  } catch (e) {
    next(e);
  }
}
