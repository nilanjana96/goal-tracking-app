const express = require("express");
const colors = require("colors");
const { errorHandler } = require("./middleware/errormiddleware");
// to use environment variables we need dotenv
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

// Initialize express
const app = express();

// creating middleware

// body parser for raw json
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// overrides the default express error handler
app.use(errorHandler);

// app.get("/", (req, res) => {
//   console.log("Testing route");
//   res.send("testing");
// });
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
console.log("after users route");

app.listen(port, () => {
  console.log(`server started listening on port ${port}`);
});
