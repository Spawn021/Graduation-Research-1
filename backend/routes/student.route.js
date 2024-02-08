const express = require("express");
const router = express.Router();
const { Student } = require("../model/student");

router.get("/member", async (req, res) => {
  const students = await Student.find(null, {
    name: 1,
    _id: 1,
    image: 1,
  });
  res.status(200).json({ students });
});

// GET: Retrieve all students
router.get("/", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const options = {
      page,
      limit,
      collation: { locale: "en" },
    };

    const students = await Student.paginate({}, options);
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching students", error: error.message });
  }
});

// POST: Create a new student
router.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    const newStudent = new Student({ name, image });
    const savedStudent = await newStudent.save();

    res.status(201).json(savedStudent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating the student", error: error.message });
  }
});

// GET: Retrieve a single student by ID
router.get("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching the student", error: error.message });
  }
});

// PUT: Update a student by ID
router.put("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const updateData = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updateData,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating the student", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newData = req.body;
    console.log("newData", newData);
    const newStudent = await Student.create(newData);

    res.status(201).json(newStudent);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating the student", error: error.message });
  }
});

// DELETE: Delete a student by ID
router.delete("/:id", async (req, res) => {
  try {
    const studentId = req.params.id;
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the student", error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const ids = req.body;

    const deletedStudent = await Student.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Students deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the student", error: error.message });
  }
});

module.exports = router;
