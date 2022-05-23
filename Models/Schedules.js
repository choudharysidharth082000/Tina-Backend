const mongoose = require("mongoose");

const { Schema } = mongoose;

const Schedules = new Schema(
  {
    availableActions: [],
    comment: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    ruleList: [],
    scheduleActionsCount: {
      type: Number,
      required: true,
    },
    validity: {
      type: Boolean,
      required: true,
    },
    timeStamp:
    {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", Schedules);

exports.Schedule = Schedule;
