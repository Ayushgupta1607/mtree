import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productImage: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  qty_avl: {
    type: Number,
    required: true,
  },
  qty_sold: {
    type: Number,
    default: 0,
  },
  qlty_avl_status: {
    type: String,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
