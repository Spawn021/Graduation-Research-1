const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
studentSchema.plugin(mongoosePaginate);
const Student = mongoose.model("Student", studentSchema);
module.exports = { Student };
