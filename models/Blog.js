const connection = require("../connection");
const mongoose = require("mongoose");

const BlogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const BlogModel = connection.model("Blog", BlogSchema);

module.exports = BlogModel;
