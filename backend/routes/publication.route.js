const express = require("express");
const router = express.Router();
const { Publication } = require("../model/publication");

router.get("/", async (req, res) => {
  const publications = await Publication.find();
  res.status(200).json(publications);
});
// GET: Lấy tất cả các bài báo
router.get("/admin", async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    const options = {
      page,
      limit,
      collation: { locale: "en" },
    };

    const publications = await Publication.paginate({}, options);
    res.status(200).json(publications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching publications", error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { names, year } = req.body;

    if (!names || !year) {
      return res.status(400).json({ message: "Names and year are required" });
    }

    const newPublication = new Publication({ names, year });
    const savedPublication = await newPublication.save();

    res.status(201).json(savedPublication);
  } catch (error) {
    res.status(500).json({
      message: "Error creating the publication",
      error: error.message,
    });
  }
});

// GET: Retrieve a single publication by ID
router.get("/:id", async (req, res) => {
  try {
    const publicationId = req.params.id;
    const publication = await publication.findById(publicationId);

    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching the publication",
      error: error.message,
    });
  }
});

// PUT: Update a publication by ID
router.put("/:id", async (req, res) => {
  try {
    const publicationId = req.params.id;
    const updateData = req.body;

    const updatedPublication = await Publication.findByIdAndUpdate(
      publicationId,
      updateData,
      { new: true }
    );

    if (!updatedPublication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(500).json({
      message: "Error updating the publication",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newData = req.body;
    console.log("newData", newData);
    const newPublication = await Publication.create(newData);

    res.status(201).json(newPublication);
  } catch (error) {
    res.status(500).json({
      message: "Error creating the publication",
      error: error.message,
    });
  }
});

// DELETE: Delete a publication by ID
router.delete("/:id", async (req, res) => {
  try {
    const publicationId = req.params.id;
    const deletedPublication = await Publication.findByIdAndDelete(
      publicationId
    );

    if (!deletedPublication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the publication",
      error: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const ids = req.body;

    const deletedPublication = await Publication.deleteMany({
      _id: { $in: ids },
    });

    res.status(200).json({ message: "Publications deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting the publication",
      error: error.message,
    });
  }
});

module.exports = router;
