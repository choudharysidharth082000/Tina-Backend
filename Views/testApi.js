const express = require("express");
const axios = require("axios");

//files importing
const { testApi } = require("../Controllers/TestApi");
const router = express.Router();

router.get("/testApi", testApi);
//after certain period of time run this route
// setInterval(async()=>
// {
//     const findData = await axios.get("http://localhost:3000/v1/testApi");
//     console.log(findData.data);
// }, 5000)

module.exports = router;
