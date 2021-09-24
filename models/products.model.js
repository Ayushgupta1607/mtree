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
    required: true,
    default: 0,
  },
  qlty_avl_status: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
