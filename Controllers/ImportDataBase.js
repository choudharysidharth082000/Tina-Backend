const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const https = require("https");
const { checkUser } = require("../middlewares/loginCheck");

//importing the models
const { Schedule } = require("../Models/Schedules");

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const importFromApi = async (req, res, next) => {
  try {
    const catalagID = localStorage.getItem("catalagID");
    if (!catalagID) {
      return res.status(404).json({
        status: false,
        message: "Please Login To Continue...",
      });
    }
    const check = await checkUser(catalagID);
    const data = await axios.get(`${process.env.API_URL}/schedules`, {
      headers: {
        Authorization: `Bearer ${check.data}`,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    if (!data) {
      console.log("Throw new Error");
    }
    //deleting the previous values
    console.log(data.data);
    const deleteAll = await Schedule.deleteMany();
    //adding all the values sto the database
    const addToDatabase = await Schedule.insertMany(data.data);
    res.status(200).json({
      status: true,
      message: "All Schedules Are Posted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
const deletAllSchedules = async (req, res, next) => {
  try {
    const deleteAllSchedules = await Schedule.deleteMany();
    if (!deleteAllSchedules) {
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
  }
};

//addint teh schedule to our database
const testAddSchedule = async (req, res) => {
  try {
    const catalagID = localStorage.getItem("catalagID");
    if(!catalagID){
      return res.status(404).json(
        {
          status: false,
          message: "Please Login To Continue..."
        }
      )
    }
    const check = await checkUser(catalagID);
    const { schedRuleList, name, comment, description } = req.body;
    const finalObj = {
      schedRuleList: schedRuleList,
      name: name,
      comment: comment,
      description: description,
    };
    //posting to the Tina Server
    const postTina = await axios.post(
      `${process.env.TINA_API_URL}/schedules/schedule`,
      finalObj,
      {
        headers: {
          Authorization: `Bearer ${check.data}`,
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    console.log(postTina.data);
    //finding the data through the public id
    const findData = await axios.get(
      `${process.env.TINA_API_URL}/schedules/${postTina.data.publicId}`,
      {
        headers: {
          Authorization: `Bearer ${check.data}`,
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    console.log(findData.data);

    //posting to our Database with a given present date timestamo
    const postDB = await new Schedule({
      ...findData.data,
      timeStamp: new Date(),
    });
    await postDB.save();
    res.status(200).json({
      status: true,
      message: "Data Posted To the DB",
      data: postDB,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: false,
      message: "Something Went Wrong",
      error: error.message,
    });
  }
};
//finding the job by the required Type
const scheduleByType = async (req, res) => {
  try {
    const { scheduleType } = req.params;
    const findSchedule = await Schedule.find({
      name: {
        $regex: scheduleType,
        $options: "i",
      },
    });
    if (!findSchedule || findSchedule.length === 0) {
      res.status(404).json({
        status: false,
        message: "Schedule Not Found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Schedules Found",
      data: findSchedule,
    });
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
  importFromApi,
  deletAllSchedules,
  testAddSchedule,
  scheduleByType,
};
