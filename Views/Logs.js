const express = require("express");
const router = express.Router();
const axios = require("axios");
const https = require("https");
const { addLogs, deleteAllLogs } = require("../Controllers/Logs");

//fetching and adding the logs to our DB
router.put("/fetchLogs", addLogs);
//deleting all teh logs
router.delete("/deleteLogs", deleteAllLogs);


//setting the ineterval to hit after every 10 seconds
// setInterval(async()=>{
//     try {
//         const fetchLogsToDB = await axios.put(`${process.env.LOCAL_SERVER}log/fetchLogs?authToken=Bearer f2b06f6bcdd8fb02a355fe3f041465e226b7f1d`);
//         console.log(fetchLogsToDB)        
//     } catch (error) {
//         console.log(error)
//     }
// },10000)

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
