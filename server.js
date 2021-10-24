const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
const jobsRoute = require("./routes/jobs");
const errorHandler = require("./middlewares/errors");
const fileupload = require("express-fileupload");
// require and use config files
require("dotenv").config({ path: "./config/.env" });
connectDB();

const app = express();

// express body parser
app.use(express.json());
app.use(fileupload());

// morgan
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// routes
app.use("/jobs", jobsRoute);

// custom error handler
app.use(errorHandler);

app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 5000;
// listen to a port
app.listen(PORT, () =>
  console.log(
    `server up and running on ${process.env.NODE_ENV} MODE at ${PORT}`
  )
);
