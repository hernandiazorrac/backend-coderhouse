import { Router } from "express";
import ProductManager from "../manager/productManager.js";

const productManager = new ProductManager("productos.json");
const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.get();
  res.json({ products });
});

router.get("/products", async (req, res) => {
  const products = await productManager.get();

  let limit = req.query.limit;

  if (limit) {
    res.json({ products });
  } else {
    const prodLimit = [];
    if (limit > products.length) limit = products.length;
    for (let index = 0; index < limit; index++) {
      prodLimit.push(products[index]);
    }
    res.json({ prodLimit });
  }
});

router.get("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productManager.getById(id);
  res.json({ product });
});

router.post("/", async (req, res) => {
  const product = req.body;
  const productAdded = await productManager.add(
    product.id,
    product.title,
    product.price,
    product.description,
    product.code,
    product.stock,
    product.category
  );

    res.json({ status: "success", productAdded });
});

router.put("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  const productToBeUpdated = req.body;

  const product = await productManager.getById(id);
  if (!product) return res.status(404).json("Product not found");

  for (const key of Object.keys(productToBeUpdated)) {
    product[key] = productToBeUpdated[key];
  }

  await productManager.update(id, product);
  res.json({ status: "success", product });
});

router.delete("/:pid", async (req, res) => {
  const id = parseInt(req.params.pid);
  await productManager.delete(id);

  res.json({ status: "success" });
});

export default router;
