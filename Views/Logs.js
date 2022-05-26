const express = require("express");
const router = express.Router();
const axios = require("axios");
const https = require("https");
const { addLogs, deleteAllLogs, testAddLogs } = require("../Controllers/Logs");

//fetching and adding the logs to our DB
router.put("/fetchLogs", addLogs);
//deleting all teh logs
router.delete("/deleteLogs", deleteAllLogs);

// setting the interval to hit this apii
// setInterval(async () => {
//   const addLogs = await axios.put(
//     `http://localhost:3000/v1/tina/log/fetchLogs`,
//     {
//       authToken: "Bearer bf1b696892b684cb06974a6cdb623b785e0642e3",
//     }
//   );
// }, 2000);
module.exports = router;
