const mongoose = require("mongoose");

const { Schema } = mongoose;

const Agents = new Schema(
  {
    availableActions: [],
    canCreateCloudStrategy: {
      type: Boolean
    },
    publicId: {
      type: String,
      required: true,
    },
    softwareVersion: {
      type: String,
    },
    summaryStratList:[],
    availableActions: [],
    canCreateCloudStrategy: {
      type: Boolean,
      required: true,
    },
    canCreateDeduplicationStrategy: 
    {
        type: Boolean
    },
    canCreateSnapshotStrategy:
    {
        type: Boolean
    },
    canCreateStandardStrategy:
    {
        type: Boolean
    },
    category:
    {
        type: Boolean
    },
    hasNdmpProtocol:
    {
        type: Boolean
    },
    hasTinaProtocol:
    {
        type: Boolean
    },
    isBackupable:
    {
        type: Boolean
    },
    isEnabled:
    {
        type: Boolean
    },
    isRestorable:
    {
        type: Boolean
    },
    isSecured:
    {
        type: Boolean
    },
    isStorageNode:
    {
        type: Boolean
    },
    isUnix:
    {
        type: Boolean
    },
    isWindows:
    {
        type: Boolean
    },
    isServer:
    {
        type: Boolean
    },
    category:
    {
        type: String
    },
    hostName:
    {
        type: String
    },
    name:
    {
        type: String
    },
    osType:
    {

    },
    definedStratList: [],


  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", Agents);

exports.Agent = Agent;
