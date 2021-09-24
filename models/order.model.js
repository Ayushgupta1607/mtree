import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  expected_delivery_date: { type: Date, required: true },
  actual_delivery_date: { type: Date },
  address: { type: String, required: true },
  status: { type: Number, required: true },
  price: { type: Number, required: true },
  comment: { type: String },
});

export default mongoose.model("Order", orderSchema);
