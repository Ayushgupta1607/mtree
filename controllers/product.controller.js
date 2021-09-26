import expressAsyncHandler from "express-async-handler";
import Product from "../models/products.model.js";
export const addProduct = expressAsyncHandler(async (req, res) => {
  if (req.user.role != 1) {
    throw new Error("Access Denied");
  }
  console.log(req.body);
  const image = req.body.image;
  console.log(image);
  const name = req.body.name;
  const qty_avl = req.body.qty_avl;
  const qlty_avl_status = req.body.qlty_avl_status;
  const category = req.body.category;
  const price = req.body.price;
  const product = await new Product({
    productImage: image,
    name: name,
    qty_avl: qty_avl,
    qlty_avl_status: qlty_avl_status,
    category: category,
    price: price,
  });
  console.log(product);

  try {
    await product.save();
    res.json({ msg: "Product created successfully" });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
});

export const editProduct = expressAsyncHandler(async (req, res) => {
  if (req.user.role != 1) {
    throw new Error("Access Denied");
  }
  const product_id = req.query.product_id;
  const product = await Product.findById(product_id);
  if (!product) {
    throw new Error("Product doesn't exist");
  }
  product.productImage = req.body.image || product.productImage;
  product.name = req.body.name || product.name;
  product.qty_avl = req.body.qty_avl || product.qty_avl;
  product.qty_sold = req.body.qty_sold || product.qty_sold;
  product.qlty_avl_status = req.body.qlty_avl_status || product.qlty_avl_status;
  product.category = req.body.category || product.category;
  product.price = req.body.price || product.price;
  try {
    await product.save();
    res.json({ msg: "Product Updated Successfully" });
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong");
  }
});

export const removeProduct = expressAsyncHandler(async (req, res) => {
  if (req.user.role != 1) {
    throw new Error("Access Denied");
  }
  const product_id = req.query.product_id;

  Product.findByIdAndDelete(product_id, (err, result) => {
    if (err) {
      throw new Error(err);
    }
    res.json({ msg: "Product removed" });
  });
});

export const listProducts = expressAsyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json({ products });
});

export const productById = expressAsyncHandler(async (req, res) => {
  const product_id = req.query.product_id;
  const product = await Product.findById(product_id);
  if (!product) {
    throw new Error("Product not found");
  }
  res.json({ product });
});
