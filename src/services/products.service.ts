import { notFoundError } from "errors/notFoundError";
import { newProduct, newProductBody } from "@/protocols/protocols";
import productsRepository from "@/repositories/products.repository";
import productsCategoryRepository from "@/repositories/products.categories.repository";

async function createProduct(product: newProductBody) {
  const categoryExists = await productsCategoryRepository.findCategoryByName(
    product.category
  );
  if (!categoryExists) throw notFoundError();
  const { category, ...uncomplete_new_product } = product;
  const new_product: newProduct = {
    ...uncomplete_new_product,
    category_id: categoryExists.id,
  };
  return await productsRepository.createProduct(new_product);
}

async function getProducts() {
  const products = await productsRepository.findAllProducts();
  if (!products[0]) throw notFoundError();
  return products;
}

async function getProductsByCategory(category: string) {
  const products = await productsRepository.findProductsByCategory(category);
  if (!products[0]?.name) throw notFoundError();
  return products;
}

async function updateProductQuantity(body: updateProductQuantityType) {
  const product = await productsRepository.findProductById(body.product_id);
  if (!product) throw notFoundError;
  const new_quantity =
    product.quantity +
    (body.type === "increase"
      ? body.quantity_transiting
      : -body.quantity_transiting);
  const updated_product = productsRepository.updateProduct({
    id: body.product_id,
    quantity: new_quantity,
  });
  return updated_product;
}

type IncreaseOrDecrease = "increase" | "decrease";

export type updateProductQuantityType = {
  product_id: number;
  quantity_transiting: number;
  type: IncreaseOrDecrease;
};

const productsServices = {
  createProduct,
  updateProductQuantity,
  getProducts,
  getProductsByCategory,
};

export default productsServices;
