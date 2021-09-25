import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  expected_delivery_date: { type: Date },
  actual_delivery_date: { type: Date },
  address: { type: Object, required: true },
  status: { type: Number, default: 0 },
  price: { type: Number, required: true },
  comment: { type: String },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model("Order", orderSchema);
