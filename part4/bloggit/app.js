const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const blogRouter = require("./controllers/blog");
const { requestLogger } = require("./utils/middleware");

const config = require("./utils/config");

const mongoUrl = config.MONGODB_URI;
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("> Connected to MongoDB");
  })
  .catch(error => {
    console.error("Problem connecting to MongoDB erro: " + error);
  });

app.use(bodyParser.json());
app.use(requestLogger);
app.use(cors());

app.use("/api/blogs", blogRouter);

module.exports = app;
