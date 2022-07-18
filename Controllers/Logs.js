const { Log } = require("../Models/Logs");
const axios = require("axios");
const https = require("https");
const moment = require("moment");
const addLogs = async (req, res) => {
  try {
    const { authToken } = req.query;
    //fetching the data from the api
    const fetchData = await axios.get(
      `${process.env.TINA_API_URL}/logs?nbMax=-1`,
      {
        headers: { Authorization: authToken },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    //for traversing the new Data
    var j = 0;
    //filtering the logs according the severity
    const newFindLogs = fetchData.data.filter(
      (element) => element.severity === 3
    );
    //checking if there is any value in the Database
    const countLog = await Log.count();

    if (countLog === 0) {
      //inserting all the values
      const addtoDatabase = await Log.insertMany(newFindLogs);
      res.status(200).json({
        status: true,
        message: "Values Inserted",
      });
    } else {
      var store = new Array();
     
      const latestData = await Log.findOne({
        sort: {
          createdAt: -1,
        },
      });
      while (true) {
        const lastStamp = newFindLogs[j].time;
        console.log(latestData.time);
        console.log(lastStamp);
        if (latestData.time != lastStamp) {
          store[j] = newFindLogs[j];
          j++;
        } else {
          break;
        }
      }
      const addLogs = await Log.insertMany(store);
      
      res.status(200).json({
        status: true,
        message: 'Values Inserted SuccessFully',
        store: store
      })
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
//deleting all the logs from the PC
const deleteAllLogs = async (req, res) => {
  try {
    const deleteAllLogs = await Log.deleteMany();
    res.send(true);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};




module.exports = {
  addLogs,
  deleteAllLogs,
  
};
