import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  roll_no: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sub1: {
    type: Number,
    required: true,
  },
  sub2: {
    type: Number,
    required: true,
  },
  sub3: {
    type: Number,
    required: true,
  },
  sub4: {
    type: Number,
    required: true,
  },
  sub5: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
});

export const Student = mongoose.model("Student", studentSchema);
export default Student;
