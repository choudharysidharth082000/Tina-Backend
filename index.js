console.log("Code Started From Here");
const cors = require("cors");
const bodyParser = require("body-parser");
const YAML = require("yamljs");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

// files imported Here
const testApi = require("./Views/testApi");
const importJobs = require("./Views/TinaMain");
const jobs = require("./Views/Jobs");
const logs = require("./Views/Logs");

//cors configurations
app.use(cors());
//body parser configurations
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//swwagger config
const swaggerUI = require("swagger-ui-express");

const swaggerJsDocs = YAML.load("./api.yaml");

//kUSHAGRA

const mongoURL = process.env.MONGODB;
//connecting the mongo Server
mongoose.connect(mongoURL, (res, err) => {
  console.log("MongoDB Connected");
});

app.get("/", (req, res) => {
  res.send("MongoDB Conncted");
});

//using the swagegr js doc
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
//using the files created
app.use("/v1/", testApi);
app.use("/v1/tina/schedule/", importJobs);
app.use("/v1/tina/job/", jobs);
app.use("/v1/tina/log/", logs);

const port = process.env.PORT;
//starting server
app.listen(port, () => {
  console.log(`Server Conncted On Port : ${port}`);
});

app.listen();
