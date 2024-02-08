const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
activitySchema.plugin(mongoosePaginate);
const Activity = mongoose.model("Activity", activitySchema);

module.exports = { Activity };
