const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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
