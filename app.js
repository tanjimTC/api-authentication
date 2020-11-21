const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// create conection
mongoose.connect("mongodb://localhost/APIAuthentication", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true, //to solve error => collection.ensureIndex is deprecated. Use createIndexes instead.
});

// checking connection
mongoose.connection.on("connected", () => {
  console.log("connected");
});

// initializing express app
const app = express();

// MiddleWares
app.use(cors());
app.use(bodyParser.json());

// Routes
const route = require("./routes/users");
app.use("/user", route);

// Start the server
const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
