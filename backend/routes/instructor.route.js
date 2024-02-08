const express = require("express");
const router = express.Router();
const { Instructor } = require("../model/instructor");
router.get("/", async (req, res) => {
  const name = req.query.name || "";
  // Save the new instructor to the database
  const instructors = await Instructor.find({
    name: { $regex: new RegExp(name.trim()), $options: "i" },
  });
  res.status(200).json({ instructors });
});
router.get("/admin", async (req, res) => {
  const { page = 1, limit = 5, name = "" } = req.query;

  try {
    const options = {
      page,
      limit,
      collation: { locale: "en" },
    };

    const instructors = await Instructor.paginate(
      { name: { $regex: new RegExp(name.trim()), $options: "i" } },
      options
    );
    res.status(200).json(instructors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching instructors", error: error.message });
  }
});

router.get("/member", async (req, res) => {
  const instructors = await Instructor.find(null, {
    name: 1,
    _id: 1,
    image: 1,
  });
  res.status(200).json({ instructors });
});
// GET a single instructor by ID
router.get("/:id", async (req, res) => {
  const instructorId = req.params.id;
  // Logic to fetch an instructor by ID from the database
  // ...
  const instructor = await Instructor.findById(instructorId);
  res.json(instructor);
});
router.put("/:id", async (req, res) => {
  try {
    const instructorId = req.params.id;
    const updateData = req.body;

    // Update the instructor in the database
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      instructorId,
      updateData,
      { new: true }
    );

    if (!updatedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Send a success response
    res.status(200).json(updatedInstructor);
  } catch (error) {
    // Error handling
    res
      .status(500)
      .json({ message: "Error updating the instructor", error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const {
      name,
      image,
      positions,
      degrees,
      email,
      researchInterests,
      studyInterests,
      intro,
      researchProjects,
      prizes,
      teachings,
    } = req.body;

    // All fields are required
    if (
      !name ||
      !image ||
      !positions ||
      !degrees ||
      !email ||
      !researchInterests ||
      !studyInterests ||
      !intro ||
      !researchProjects ||
      !prizes ||
      !teachings
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new instructor
    const newInstructor = new Instructor({
      name,
      image,
      positions,
      degrees,
      email,
      researchInterests,
      studyInterests,
      intro,
      researchProjects,
      prizes,
      teachings,
    });

    // Save the new instructor to the database
    const savedInstructor = await newInstructor.save();

    // Send a success response
    res.status(201).json(savedInstructor);
  } catch (error) {
    // Error handling
    res
      .status(500)
      .json({ message: "Error creating the instructor", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const instructorId = req.params.id;

    // Delete the instructor from the database
    const deletedInstructor = await Instructor.findByIdAndDelete(instructorId);

    if (!deletedInstructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    // Send a success response
    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    // Error handling
    res
      .status(500)
      .json({ message: "Error deleting the instructor", error: error.message });
  }
});
router.delete("/", async (req, res) => {
  try {
    const ids = req.body;

    const deletedInstructor = await Instructor.deleteMany({
      _id: { $in: ids },
    });

    res.status(200).json({ message: "Instructors deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the instructor", error: error.message });
  }
});

module.exports = router;
