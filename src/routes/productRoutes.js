import { Router } from "express";

import { listProducts } from "../controllers/ProductController.js";

const productRoutes = Router();

productRoutes.get("/", listProducts);

export default productRoutes;
