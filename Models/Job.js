const mongoose = require("mongoose");

const { Schema } = mongoose;

const Jobs = new Schema(
  {
    presentationId: {
      type: Number,
    },
    userName: {
      type: String,
    },
    medias: {
      type: [],
      required: true,
    },
    deletionDate: {
      type: Date,
    },
    executedDate: {
      type: Date,
    },
    endedDate: {
      type: Date,
    },
    submittedDate: {
      type: Date,
    },
    startDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
    },
    isBackup: {
      type: Boolean,
    },
    integrityFree: {
      type: Boolean,
    },
    processedVolume: {
      type: Number,
    },
    expectedVolume: {
      type: Number,
    },
    numberOfPendingRequests: {
      type: Number,
    },
    averageRate: {
      type: Number,
    },
    progression: {
      type: Number,
    },
    fatherjobId: {
      type: Number,
    },
    processedObjects: {
      type: Number,
    },
    hasProgression: {
      type: Boolean,
    },
    childIdList: [],
    sessions: [],
    warnings: [],
    modificationDate: {
      type: Date,
    },
    folderName: {
      type: String,
    },
    hostName: {
      type: String,
    },
    availableActions: [],
    format: {
      type: String,
    },
    type: {
      type: String,
    },
    duration: {
      type: Number,
    },
    comment: {
      type: String,
    },
    publicId: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: Number,
    },
    priority: {
      type: String,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", Jobs);

exports.Job = Job;
