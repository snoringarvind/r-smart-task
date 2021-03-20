const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.createConnection(
  process.env.DB_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("DB connected")
);

module.exports = connection;
