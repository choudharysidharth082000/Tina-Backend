const express = require("express");
const router = express.Router();
const {findAgents, getData, findCount, getCountAll} = require("../Controllers/Agents");

//fetching the agents
router.get("/findAgent", findAgents)
router.get("/getAgent", getData)
router.get("/findCount", findCount)
router.get("/findCountAll", getCountAll)

module.exports = router;