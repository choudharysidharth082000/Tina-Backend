const axios = require("axios");
const https = require("https");
const { Agent } = require("../Models/Agents");
const findAgents = async (req, res, next) => {
  try {
    const findAgents = await axios.get(
      `${process.env.API_URL}/agents?category=host`,
      {
        headers: {
          Authorization: "Bearer 6ab6a502073bd1aa2678f457da8f27264f1a4a65",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    const countHost = await axios.get(
      `${process.env.API_URL}/agents?category=application`,
      {
        headers: {
          Authorization: "Bearer 6ab6a502073bd1aa2678f457da8f27264f1a4a65",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    //delete agent
    const deleteAgents = await Agent.deleteMany();
    console.log(deleteAgents);
    //adding to the database
    const addAgents = await Agent.insertMany(findAgents.data);
    const addApplication = await Agent.insertMany(countHost.data);
    res.send("Success");
    console.log(findAgents.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const findCount = async (req, res, next) => {
  try {
    const countAgent = await Agent.count();
    res.status(200).json({
      count: countAgent,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};
const getData = async (req, res, next) => {
  try {
    const getData = await Agent.find();
    console.log(getData);
    res.status(200).json({
      data: getData,
    });
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

//external function
const getCountAll = async (req, res, next) => {
  try {
    const countAgent = await Agent.count();
    const countHost = await axios.get(
      `${process.env.API_URL}/agents?category=host`,
      {
        headers: {
          Authorization: "Bearer 6ab6a502073bd1aa2678f457da8f27264f1a4a65",
        },
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      }
    );
    res.status(200).json({
      countAgent: countAgent,
      countApplication: countHost.data.length,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  findAgents,
  findCount,
  getData,
  getCountAll,
};
