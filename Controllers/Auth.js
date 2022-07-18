const axios = require("axios")
const https = require("https");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage('./scratch');
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
      console.log(localStorage.getItem("token"));
      res.send("Login success");
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports =
{
    login
}
