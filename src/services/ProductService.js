import { AppDataSource } from "../config/dbconnect.js";

export const getProducts = async () => {
  const productRepository = AppDataSource.getRepository("Product");

  const products = await productRepository.find({
    where: {
      isActive: true,
    },

    order: {
      isFeatured: "DESC",
    },
  });

  return {
    featured: products.filter((product) => product.isFeatured),

    coins: products.filter((product) => product.type === "coins"),

    lives: products.filter((product) => product.type === "lives"),
  };
};
