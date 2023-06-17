import { product } from "@prisma/client";

export type newProduct = Omit<product, "created_at" | "updated_at">;

export type newProductBody = Omit<newProduct, "category_id"> & {
  category: string;
};

export type ApplicationError = {
  name: string;
  message: string;
};
