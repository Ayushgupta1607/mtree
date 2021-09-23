import { Router } from "express";
import Student from "../models/student.model.js";
export const router = Router();
export default router;
router.post("/createRecord", async (req, res) => {
  const roll_no = req.body.roll_no;
  const name = req.body.name;
  const sub1 = +req.body.sub1;
  const sub2 = +req.body.sub2;
  const sub3 = +req.body.sub3;
  const sub4 = +req.body.sub4;
  const sub5 = +req.body.sub5;
  console.log(sub3, "sub3");
  const total = sub1 + sub2 + sub3 + sub4 + sub5;
  const percentage = (sub1 + sub2 + sub3 + sub4 + sub5) / 5;
  const result = percentage < 33 ? "Fail" : "Pass";

  //   const studentExist = await Student.findOne(
  //     { roll_no: roll_no },
  //     (err, result) => {
  //       if (err) console.log(err, "err");
  //       else return result;
  //     }
  //   );
  //   if (studentExist) {
  //     res.status(400).send("studnet already exist");
  //   }

  const student = new Student({
    roll_no: roll_no,
    name: name,
    sub1: sub1,
    sub2: sub2,
    sub3: sub3,
    sub4: sub4,
    sub5: sub5,
    total: total,
    percentage: percentage,
    result: result,
  });
  console.log(student);
  try {
    const newStudent = await student.save();
    res.json(newStudent);
  } catch (err) {
    console.log(err);
    res.status(470).json({ err: "something went wrong" });
  }
});

router.get("/listRecords", async (req, res) => {
  const records = await Student.find({}, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({ err: err });
    } else {
      res.json(result);
    }
  });
});

router.delete("/removeRecord/", async (req, res) => {
  const id = req.query.id;

  await Student.findByIdAndDelete(id, (err, result) => {
    if (err) {
      res.status(400).json({ err: "record not fount" });
    } else {
      res.json({ message: "record deleted" });
    }
  });
});

router.patch("/editRecord", async (req, res) => {
  const id = req.query.id;
  let student;
  await Student.findById(id, (err, result) => {
    if (err) res.status(400).json({ err: "record not found" });
    else {
      student = result;
    }
  });
  student.name = req.body.name || student.name;
  student.sub1 = req.body.sub1 || student.sub1;
  student.sub2 = req.body.sub2 || student.sub2;
  student.sub3 = req.body.sub3 || student.sub3;
  student.sub4 = req.body.sub4 || student.sub4;
  student.sub5 = req.body.sub5 || student.sub5;
  student.total =
    student.sub1 + student.sub2 + student.sub3 + student.sub4 + student.sub5;
  student.percentage = student.total / 500;
  student.result = req.body.percentage < 33 ? "Fail" : "Pass";
  await Student.updateOne({ _id: id }, student, (err, result) => {
    if (err) {
      console.log("something went wring");
      res.status(404).send("err");
    } else res.json(result);
  });
});
