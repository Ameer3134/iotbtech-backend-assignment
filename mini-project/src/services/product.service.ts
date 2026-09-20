import { readFileSync } from "fs";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}


function loadProducts(): Product[] {
  const fileContent = readFileSync("data/products.csv", "utf-8");
  const lines = fileContent.split("\n").slice(1); // Skip header line


  return lines.map((line) => {
    const [id, name, category, price, stock] = line.split(",");
    return {
      id: Number(id),
      name,
      category,
      price: Number(price),
      stock: Number(stock),
    };
  });

}

let products: Product[] = loadProducts();
let nextId = products.length + 1;

export function findAllProducts(): Product[] {
  return products;
}

export function findProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}


export function createProduct(data: Omit<Product, "id">): Product {
  const newProduct: Product = {
    id: nextId++,
    ...data
  };
  products.push(newProduct);
  return newProduct;
}


export function updateProduct(id: number, data: Partial<Omit<Product, "id">>): Product | undefined {
  const product = findProductById(id);
  if (!product) {
    return undefined;
  }
  const updatedProduct = { ...product, ...data };
  products = products.map((p) => (p.id === id ? updatedProduct : p));
  return updatedProduct;
}


export function deleteProduct(id: number): boolean {
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) {
    return false;
  }
  products.splice(productIndex, 1);
  return true;
}