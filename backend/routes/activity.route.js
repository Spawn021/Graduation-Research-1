const express = require("express");
const router = express.Router();
const { Activity } = require("../model/activity");

router.get("/home", async (req, res) => {
  const activities = await Activity.find(null, {
    name: 1,
    _id: 1,
    image: 1,
    date: 1,
  });
  res.status(200).json({ activities });
});

// POST: Create a new activity
router.get("/", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const options = {
      page,
      limit,
      collation: { locale: "en" },
    };

    const activities = await Activity.paginate({}, options);
    res.status(200).json(activities);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching activities", error: error.message });
  }
});

// POST: Create a new activity
router.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { name, image, date } = req.body;

    if (!name || !image || !date) {
      return res
        .status(400)
        .json({ message: "Name , image and date are required" });
    }

    const newActivity = new Activity({ name, image, date });
    const savedActivity = await newActivity.save();

    res.status(201).json(savedActivity);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating the activity", error: error.message });
  }
});

// GET: Retrieve a single activity by ID
router.get("/:id", async (req, res) => {
  try {
    const activityId = req.params.id;
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching the activity", error: error.message });
  }
});

// PUT: Update a activity by ID
router.put("/:id", async (req, res) => {
  try {
    const activityId = req.params.id;
    const updateData = req.body;

    const updatedActivity = await Activity.findByIdAndUpdate(
      activityId,
      updateData,
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(updatedActivity);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating the activity", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newData = req.body;
    console.log("newData", newData);
    const newActivity = await Activity.create(newData);

    res.status(201).json(newActivity);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating the activity", error: error.message });
  }
});

// DELETE: Delete a activity by ID
router.delete("/:id", async (req, res) => {
  try {
    const activityId = req.params.id;
    const deletedActivity = await Activity.findByIdAndDelete(activityId);

    if (!deletedActivity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the activity", error: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const ids = req.body;

    const deletedActivity = await Activity.deleteMany({ _id: { $in: ids } });

    res.status(200).json({ message: "Activities deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting the activity", error: error.message });
  }
});

module.exports = router;
