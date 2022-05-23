const express = require("express");
const router = express.Router();
const axios = require("axios");
const https = require("https");
const { addLogs, deleteAllLogs } = require("../Controllers/Logs");

//fetching and adding the logs to our DB
router.put("/fetchLogs", addLogs);
//deleting all teh logs
router.delete("/deleteLogs", deleteAllLogs);

// setting the interval to hit this apii
setInterval(async () => {
  const addLogs = await axios.put(
    `http://localhost:3000/v1/tina/log/fetchLogs`,
    {
      authToken: "Bearer 7036153f0d7797b3867844f60dc03e90bc4d627e",
    }
  );
}, 100000);
module.exports = router;
