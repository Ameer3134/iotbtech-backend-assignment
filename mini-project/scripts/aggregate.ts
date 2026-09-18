import { createReadStream, createWriteStream } from "fs";
import { createInterface } from "readline";

const rl = createInterface({
  input: createReadStream("data/products.csv"),
  crlfDelay: Infinity,
});

const start = performance.now();

let isFirstLine = true;
const byCategory = new Map<string, number>();
let grandTotal = 0;
let count = 0;

for await (const line of rl) {
  if (isFirstLine) {
    isFirstLine = false;
    continue;
  }
    const [id, name, category, price, stock] = line.split(",");
    const total = Number(price) * Number(stock);

    grandTotal += total;
    count++;

    const currentTotal = byCategory.get(category) || 0;
    byCategory.set(category, currentTotal + total);

  
}


const outPath = process.env.OUTFile ?? "data/category-summary.csv";
const out = createWriteStream(outPath);
out.write("category,total\n");

for (const [cat, total] of byCategory) {
  console.log(`${cat} → $${total.toFixed(2)}`);
  out.write(`${cat},${total.toFixed(2)}\n`);
}
out.end();


console.log(`Rows: ${count}`);
console.log(`Grand total: $${grandTotal.toFixed(2)}`);


console.log(`Took ${(performance.now() - start).toFixed(1)} ms`);