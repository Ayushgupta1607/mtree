import User from "../models/user.model.js";
import expressAsyncHandler from "express-async-handler";
import {
  comparePassword,
  encryptPassword,
  generateToken,
} from "../utils/helper.js";

export const register = expressAsyncHandler(async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const mobile_number = req.body.mobile_number;
  const address = req.body.address;
  let password = req.body.password;

  password = await encryptPassword(password);
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    throw new Error("User already exist");
  }
  const user = new User({
    name: name,
    email: email,
    mobile_number: mobile_number,
    address: address,
    password: password,
  });
  try {
    await user.save();
    res.json({ data: user, msg: "User created" });
  } catch (err) {
    console.log(err);
    throw new Error("something went wrong");
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    throw new Error("User doesn't exist");
  }
  const password = req.body.password;
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Incorrect password");
  }
  const token = await generateToken({
    id: user._id,
    email: user.email,
  });
  res.json({
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      address: user.address,
      orders: user.orders,
      token,
    },
  });
});

export const userDetails = expressAsyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);
  if (!user) throw new Error("Something Went Wrong");

  res.json({
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile_number: user.mobile_number,
      role: user.role,
      address: user.address,
      orders: user.orders,
    },
  });
});
