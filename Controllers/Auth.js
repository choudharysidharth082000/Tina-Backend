const axios = require("axios");
const https = require("https");
var LocalStorage = require("node-localstorage").LocalStorage;
//login model
const { User } = require("../Models/Login");
localStorage = new LocalStorage("./scratch");
const login = async (req, res, next) => {
  const { user, password, catalog, server } = req.body;
  const finalObj = {
    lang: "en",
    user: user,
    password: password,
    connectReason: "adminAndSupervise",
    catalog: catalog,
    server: server,
  };
  let axiosConfig = {
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };
  //login to third party organization
  try {
    //checkig if the user is already present or not
    const userExist = await User.findOne({ user: user });
    if (user) {
      const loginTina = await axios.put(
        `${process.env.API_URL}/users/authenticate`,
        finalObj,
        axiosConfig
      );
      if (!loginTina) {
        res.send("Login failed");
      } else {
        //update the token in the database
        const updateToken = await User.updateOne(
          { user: user },
          {
            Token: loginTina.data.token,
          }
        );
        res.status(200).json({
          status: true,
          message: "Login Successful",
          data: updateToken,
        });
      }
    } else {
      const loginTina = await axios.put(
        `${process.env.API_URL}/users/authenticate`,
        finalObj,
        axiosConfig
      );
      if (!loginTina) {
        res.send("Login failed");
      } else {
        console.log(loginTina.data);
        localStorage.setItem("token", loginTina.data.token);
        //cehckint the catalog
        const newAxiosCOnfig = {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          headers: {
            Authorization: `Bearer ${loginTina.data.token}`,
          },
        };
        console.log(newAxiosCOnfig);
        const checkCatalog = await axios.get(
          `${process.env.API_URL}/current-catalog/info`,
          newAxiosCOnfig
        );
        console.log(checkCatalog.data);
        const loginObj = {
          lang: "en",
          user: user,
          password: password,
          connectReason: "adminAndSupervise",
          catalog: catalog,
          server: server,
          catalogName: checkCatalog.data.catalogName,
          catalogId: checkCatalog.data.catalogUUID,
          Token: loginTina.data.token,
        };
        const postLogin = await new User(loginObj).save();
        if (!postLogin) {
          res.send("login Failed");
        } else {
          localStorage.setItem("catalogID", checkCatalog.data.catalogUUID);
          res.send("login Success");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = {
  login,
};
