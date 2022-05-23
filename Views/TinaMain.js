const express = require("express");
const router = express.Router();
const {
  importFromApi,
  deletAllSchedules,
  testAddSchedule,
  scheduleByType
} = require("../Controllers/ImportDataBase");
const upload = require("../middlewares/Multer");

//files import
const multer = require("multer");
//adding all the schedules to the database
router.put("/fetchTina", upload.single("sample"), importFromApi);
//deleting all the schedules from the database
router.put("/deleteAllSchedules", upload.single("sample"), deletAllSchedules);
//adding the database
router.post("/testAddSchedule", upload.single("sample"), testAddSchedule);
//fetching schedules Weekly Monthly or daily
router.get("/fetchSchduleByType/:scheduleType", scheduleByType);
module.exports = router;
