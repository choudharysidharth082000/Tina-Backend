const axios = require("axios");
const https = require("https");
const { Job } = require("../Models/Job");
const { Schedule } = require("../Models/Schedules");
const moment = require("moment");
const fetchAllJobs = async (req, res, next) => {
  const { authToken } = req.body;
  try {
    const fetchJobs = await axios.get(`${process.env.TINA_API_URL}/jobs`, {
      headers: {
        Authorization: authToken,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    if (!fetchJobs) {
      res.status(404).json({
        status: false,
        message: "Jobs Not Found",
      });
    }

    //first delete all Values
    const deleteAll = await Job.deleteMany();
    console.log(deleteAll);
    //adding all the jobs to the database
    try {
      for (var i = 0; i < fetchJobs.data.length; i++) {
        console.log(`${i}th Document Inserted`);
        const singleOne = await new Job(fetchJobs.data[i]);
        await singleOne.save();
      }
      res.status(200).json({
        status: true,
        count: fetchJobs.data.length,
        message: "Data Inserted SuccessFully",
        data: fetchJobs.data,
      });
      console.log("Job Completed");
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: false,
        message: "Unable to Add to the Database",
        error: error.message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      message: error.message,
    });
  }
};
//find jobs by there status
const findStatusJobs = async (req, res) => {
  const JobValue = req.params.jobType;
  var jobParam = 17;
  if (JobValue === "Failed") {
    jobParam = 15;
  }
  try {
    const searchJob = await Job.find({ status: jobParam });
    if (!searchJob) {
      res.status(404).json({
        status: false,
        message: "Jobs Not Found",
      });
    }
    res.status(200).json({
      status: true,
      data: searchJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
//deleting all the jobs from our database
const deleteAllJobs = async (req, res, next) => {
  try {
    const deleteAllJobs = await Job.deleteMany();
    if (!deleteAllJobs) {
      res.status(400).json({
        status: false,
        message: "Jobs are not deleted",
      });
    }
    res.status(200).json({
      status: true,
      message: "All Jobs are deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    req.status(500).json({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });

    next();
  }
};
const fetchJobType = async (req, res) => {
  try {
    const fetchJobs = await Job.find({
      description: {
        $regex: `(${req.params.jobType})`,
        $options: "i",
      },
    });
    res.send(fetchJobs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went Wrong",
      error: error.message,
    });
  }
};
/**
 * Finding the Jobs between the schedule creation timeStamp and the present date
 * and degregating the jobs based on monthly weeky and daily backups and there periodicity
 * (but the condition here is shcedule creation must have a timestamp in it)
 */
const findJobRan = async (req, res) => {
  try {
    //finding the timeSTamp from the schedule
    const findSchedule = await Schedule.findOne({ _id: req.params.scheduleID });
    if (!findSchedule) {
      res.status(404).json({
        status: false,
        message: "Required Document Not Found",
      });
    }
    console.log(findSchedule);
    //type of the find shcedule --> wether it is for day, week or month
    const arrayString = findSchedule.name.split(" ");

    
    if(arrayString[0] === "Daily")
    {
      const timeStamp = moment(findSchedule.timeStamp);
      while(true)
      {
        const newDate = moment(timeStamp).add(1,'days');
        var i=0;
        const momentSearchDate = moment(newDate + '' + findSchedule.ruleList[0].times[i]);
        console.log(momentSearchDate);
      }

    }
    else if(arrayString[0] === "Monthly")
    {

    }
    else 
    {

    }

    const scheduleTimeStamp = findSchedule.timeStamp;
    const momentDate = moment(scheduleTimeStamp).startOf("day");
    console.log(momentDate);

    const today = moment().startOf("day");
    //finding all the jobs between the schedule timeStamp and and the now Date
    const findJobs = await Job.find({
      executedDate: {
        $gte: momentDate,
        $lte: moment(today).endOf("day").toDate(),
      },
    });
    res.send(findJobs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,

      message: "Something went wrong",
      error: error.message,
    });
  }
};


module.exports = {
  fetchAllJobs,
  findStatusJobs,
  deleteAllJobs,
  fetchJobType,
  findJobRan,
};
