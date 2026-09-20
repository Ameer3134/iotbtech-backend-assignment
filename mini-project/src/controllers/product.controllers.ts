import { Request, Response } from "express";
import { findProductById, findAllProducts, createProduct as createProductService, deleteProduct as deleteProductService, updateProduct as updateProductService } from "../services/product.service.js";


export function getProductById(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = findProductById(id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.json(product);
}


export function getAllProducts(req: Request, res: Response) {
  const category = req.query.category as string | undefined;
  const products = findAllProducts();

  if (category) {
    const filtered = products.filter((p) => p.category === category);
    return res.json(filtered);
  }

  res.json(products);
}

export function createProduct(req: Request, res: Response) {
  const { name, category, price, stock } = req.body;
  if (!name ||  typeof price !== "number") {
    return res.status(400).json({ error: "name and price are required" });
  }
  const newProduct = createProductService({ name, category, price, stock });
  res.status(201).json(newProduct);
}


export function updateProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const updated = updateProductService(id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(updated);
}

export function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const deleted = deleteProductService(id);

  if (!deleted) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json({ deleted: true, id });
}