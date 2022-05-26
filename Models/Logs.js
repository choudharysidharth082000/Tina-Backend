const mongoose = require("mongoose");

const { Schema } = mongoose;

const Logs = new Schema(
  {
    categories: {
      type: String,
      required: true,
    },
    development: {
      type: String,
      default: "",
    },
    hostName: {
      type: String,
      required: true,
    },
    jobId: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    pid: {
      type: Number,
      required: true,
    },
    progName: {
      type: String,
      required: true,
    },
    severity: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    // timeStamp:
    // {
    //   type: Date,
    //   required: true
    // },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model("Log", Logs);

exports.Log = Log;
