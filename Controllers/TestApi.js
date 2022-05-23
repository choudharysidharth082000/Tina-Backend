const express = require("express");
const testApi = (req, res, next) => {
  res.send("Test Api Successful");
  next();
};
module.exports = { testApi };
