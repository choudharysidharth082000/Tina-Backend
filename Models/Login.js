const mongoose = require("mongoose");

const { Schema } = mongoose;

const Users = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    catalogName: {
      type: String,
      required: true,
    },
    catalogId: {
      type: String,
      required: true,
    },
    connectReason: {
      type: String,
      required: true,
    },
    Token: {
      type: String,
      required: true,
    },
    server: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", Users);

exports.User = User;
