import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile_number: {
    type: Number,
    required: true,
  },
  role: {
    type: Number,
    // required: true,
    default: 0,
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

export default mongoose.model("User", userSchema);
