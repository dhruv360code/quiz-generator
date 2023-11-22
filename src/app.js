const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "2mb", extended: true }));

const routes = require("./routes");

app.use("/api", routes.quizRoutes);

module.exports = app;
