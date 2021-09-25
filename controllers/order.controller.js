import expressAsyncHandler from "express-async-handler";
import Product from "../models/products.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
export const placeOrder = expressAsyncHandler(async (req, res) => {
  const products = req.body.items;
  if (products.length === 0) {
    throw new Error("Product not found");
  }
  const items = [];
  let amount = 0;
  for (const product of products) {
    const result = await Product.findById(product.product_id);
    if (!result) {
      throw new Error("Product Not Found");
    }
    if (result.qty_avl >= product.qty) {
      items.push(result);
      console.log(result);
      amount += result.price * product.qty;
    } else {
      throw new Error("out of stock");
    }
  }
  console.log(amount);
  const address = req.body.address;
  const comment = req.body.ordernote;
  const user = await User.findById(req.user.id);
  const order = await new Order({
    user: req.user.id,
    address: address,
    price: amount,
    comment: comment,
    items: items,
  });
  //   order.items = items;
  try {
    await order.save();
    user.orders.push(order);
    await user.save();
    products.forEach(async (product) => {
      // const result =
      Product.findById(product.product_id, async (err, result) => {
        if (err) {
          throw new Error("something went wrong");
        }
        result.qty_avl -= product.qty;
        result.qty_sold += product.qty;
        await result.save();
      });
    });
    res.json({ msg: "order placed" });
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong");
  }
});

export const getOrders = expressAsyncHandler(async (req, res) => {
  if (req.user.role != 1) {
    throw new Error("Access Denied");
  }
  const orders = await Order.find();
  res.json({ orders: orders });
});

export const getOrderById = expressAsyncHandler(async (req, res) => {
  const orderId = req.query.order_id;
  const order = await Order.findById(orderId).populate("items");
  if (!order) {
    throw new Error("Order not found");
  }
  res.json({ order });
});

export const getOrdersByUser = expressAsyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await User.findById(userId).populate("orders");
  res.json({ orders: orders });
});
export const editOrder = expressAsyncHandler(async (req, res) => {
  if (req.user.role != 1) {
    throw new Error("access denied");
  }
  const orderId = req.query.order_id;
  const status = req.body.status;
  const order = await Order.findById(orderId);
  if (!order) {
    throw new "Order not found"();
  }
  order.status = status;
  try {
    await order.save();
    res.json({ msg: "status updated" });
  } catch (err) {
    throw new Error("Something went wrong");
  }
});
