import { Router } from "express";

import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/product.controllers.js";

import { requireApiKey } from "../middleware/requireApiKey.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
export default router;


router.post("/", requireApiKey, createProduct);
router.put("/:id", requireApiKey, updateProduct);
router.delete("/:id", requireApiKey, deleteProduct);
