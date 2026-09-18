import { writeFileSync } from "fs";


const ROWS = Number(process.env.ROWS ?? 10_000);
const categories = ["electronics", "clothing", "books", "home", "toys", "food"];


const rows: string[] = ["id,name,category,price,stock"];

for (let i = 0; i < ROWS; i++) {
  const category = categories[i % categories.length];
  const name = `${category}-${i + 1}`;
  const price = (Math.random() * 100).toFixed(2);
  const stock = Math.floor(Math.random() * 501);
  rows.push(`${i + 1},${name},${category},${price},${stock}`);
}

writeFileSync("data/products.csv", rows.join("\n"));
console.log(`Generated ${ROWS} rows -> data/products.csv`);






