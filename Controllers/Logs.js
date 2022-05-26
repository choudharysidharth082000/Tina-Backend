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
      const lastStamp = newFindLogs[j].time;
      const latestData = await Log.findOne({
        sort: {
          createdAt: -1,
        },
      });
      console.log(latestData.time);
      while (true) {
        console.log(latestData.time);
        console.log(lastStamp);
        if (latestData.time != lastStamp) {
          store[j] = newFindLogs[j];
        } else {
          break;
        }
      }
      res.status(200).json({
        status: true,
        message: 'Values Inserted SuccessFully'
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

const testAddLogs = async (req, res) => {
  const { authToken } = req.query;
  try {
    //fidning from the tina api
    const findLogs = await axios.get(
      `${process.env.TINA_API_URL}/logs?nbMax=1000`,
      {
        headers: {
          Authorization: authToken,
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );

    //filtering the logs according the severity
    const newFindLogs = findLogs.data.filter(
      (element) => element.severity === 4
    );
    console.log(findLogs);
    console.log(newFindLogs[0]);
    //fidning the logs if there are any logs present in the db
    const checkCountLog = await Log.count();
    if (checkCountLog === 0) {
      //there are no logs so we have to add all the logs thrown by the tina
      // for (var i = 0; i < newFindLogs.length; i++) {
      //   var momentDate = moment.unix(newFindLogs[i].time).utc().toString();
      //   console.log(momentDate);
      //   const addData = await new Log({
      //     ...newFindLogs[i],
      //     timeStamp: momentDate,
      //   });
      //   await addData.save();
      //   console.log(`${i}th Log Added`);
      // }
      //addint data through foreach
      const newData = newFindLogs.forEach((element) => {
        const momentDate = moment.unix(element.time).utc().toString();
        element.timeStamp = momentDate;
      });
      //now our data is in newData variable
      //adding the whole array to the DB
      const insertDB = await Log.insertMany(newData);
      console.log("Job Ended");

      //seding response
      res
        .status(200)
        .json({ status: true, message: "Logs Inserted SucecssFully" });
    } else {
      //finding the first log and checking its timestamp
      const findFirstLog = await Log.findOne({ sort: { timeStamp: -1 } });
      console.log(findFirstLog.timeStamp);
      const resultTimeStamp = moment(findFirstLog.timeStamp).utc().toString();

      var j = 0;
      while (true) {
        //converting the unix timeStamp to the utc string format
        const momentTime = moment.unix(newFindLogs[j].time).utc().toString();
        if (momentTime != resultTimeStamp) {
          // adding it to the DB
          const addToDatabase = await new Log({
            ...newFindLogs[j],
            timeStamp: momentTime,
          });
          await addToDatabase.save();
          console.log(`${j}th Log Added`);
          console.log("Hello world");
          j++;
        } else {
          console.log("Item Inserted: ", j);
          break;
        }
      }
      console.log("Job Completed SuccessFully");
      //sending status to the user
      res
        .status(200)
        .json({ status: true, message: "Logs Inserted SucecssFully" });
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
module.exports = {
  addLogs,
  deleteAllLogs,
  testAddLogs,
};
