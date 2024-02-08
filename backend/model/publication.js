const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const publicationSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
  },
  names: {
    type: [String],
    required: true,
  },
});
publicationSchema.plugin(mongoosePaginate);
const Publication = mongoose.model("Publication", publicationSchema);

module.exports = { Publication };
