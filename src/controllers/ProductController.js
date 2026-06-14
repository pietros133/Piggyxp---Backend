import { getProducts } from "../services/ProductService.js";

export const listProducts = async (req, res) => {
  try {
    const products = await getProducts();

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
