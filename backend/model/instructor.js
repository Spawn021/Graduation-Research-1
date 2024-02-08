const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  positions: {
    type: [String],
    required: true,
  },
  degrees: {
    type: [String],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  researchInterests: {
    type: [String],
    required: true,
  },
  studyInterests: {
    type: [String],
    required: true,
  },
  intro: {
    type: [String],
    required: true,
  },
  researchProjects: {
    type: [String],
    required: true,
  },
  prizes: {
    type: [String],
    required: true,
  },
  teachings: {
    type: [String],
    required: true,
  },
});
instructorSchema.plugin(mongoosePaginate);
const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = { Instructor };
