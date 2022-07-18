const express = require("express");
const router = express.Router();
const {
  fetchAllJobs,
  findStatusJobs,
  deleteAllJobs,
  fetchJobType,
  findJobRan,
  findJobsOnDate,
  findLogs,
  findJobsOnDateData,
} = require("../Controllers/Jobs");
const multer = require("multer");

//route to fetch all the jobs
router.put("/fetchJobs", fetchAllJobs);
//getting the jobs by theere status
router.put("/fetchJobStatus/:jobType", findStatusJobs);
router.put("/fetchJobType/:jobType", fetchJobType);
//delete all the jobs
router.delete("/deleteAllJobs", deleteAllJobs);
//finding all the job which ran successfully
router.put("/findJobRan/:scheduleID", findJobRan);
//finding all the jobs completd on nth day
router.get("/findJobsOnDate", findJobsOnDate);
//finding all the jobs completed data on the nth Day
router.get("/findJobsOnDateData", findJobsOnDateData);
//finding the logs according to its specific job
router.get("/findJobsByLogs", findLogs);

module.exports = router;
