const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/APIAuthentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, //to solve error => collection.ensureIndex is deprecated. Use createIndexes instead.
});

const app = express();

// MiddleWares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

// Start the server
const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
