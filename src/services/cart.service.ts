import { conflictError } from "@/errors/conflictError";
import { notFoundError } from "@/errors/notFoundError";
import cartRepository from "@/repositories/cart.repository";

async function createCartItem(user_id: number, product_id: number) {
  const product_exists_in_cart =
    await cartRepository.findCartItemByUserIdAndProductId(user_id, product_id);
  if (product_exists_in_cart) {
    if (
      product_exists_in_cart.product.quantity >=
      product_exists_in_cart.quantity + 1
    )
      throw conflictError();
    return await cartRepository.updateCartItemQuantity(
      product_exists_in_cart.id,
      product_exists_in_cart.quantity + 1
    );
  }
  return await cartRepository.createCartItem(product_id, user_id);
}

async function getAllCartItems(user_id: number) {
  return await cartRepository.getCartitems(user_id);
}

async function updateCartItemQuantity(cart_item_id: number, quantity: number) {
  const item_exists = cartRepository.findCartItemById(cart_item_id);
  if (!item_exists) throw notFoundError;
  return await cartRepository.updateCartItemQuantity(cart_item_id, quantity);
}

async function deleteCartItem(cart_item_id: number) {
  const item_exists = cartRepository.findCartItemById(cart_item_id);
  if (!item_exists) throw notFoundError;
  return await cartRepository.deleteCartItem(cart_item_id);
}

const cartServices = {
  createCartItem,
  getAllCartItems,
  updateCartItemQuantity,
  deleteCartItem,
};

export default cartServices;
