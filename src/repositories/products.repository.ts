import prisma from "@/config/prisma";
import { newProduct } from "@/protocols/protocols";
import { product } from "@prisma/client";

function createProduct(product: newProduct) {
  return prisma.product.create({
    data: product,
  });
}

function updateProduct(product: Pick<product, "id"> & Partial<product>) {
  return prisma.product.update({
    where: {
      id: product.id,
    },
    data: {
      ...product,
    },
  });
}

async function findAllProducts() {
  return await prisma.product.findMany({
    take: 100,
  });
}

async function findProductsByCategory(category: string) {
  return await prisma.products_category.findMany({
    include: {
      products: true,
    },
    where: {
      name: category,
    },
  });
}

async function findProductById(id: number) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

const productsRepository = {
  createProduct,
  updateProduct,
  findProductById,
  findAllProducts,
  findProductsByCategory,
};

export default productsRepository;
