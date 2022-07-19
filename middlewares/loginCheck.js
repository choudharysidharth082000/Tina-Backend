const axios = require("axios");
const {User} = require("../Models/Login")
const loginMiddle = async (user, password, catalog, server) => {
  const finaObj = {
    lang: "en",
    user: user,
    password: password,
    connectReason: "adminAndSupervise",
    catalog: catalog,
    server: server,
  };
  const axiosMeta = 
  {
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  }
  try {
    const login = await axios.put(`${process.env.API_URL}/users/authenticate`, finaObj, axiosMeta);
    if(login.data.token) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
const checkUser = async(catalogID) =>
{
    try {
        const findUser = await User.findOne({catalogId: catalogID});
        console.log(findUser);
        if(!findUser)
        {
            return {
                status : false,
                data: NULL,
                error: "User Not Found"
            }
        }
        return {
            status: true,
            data: findUser.Token
        }

        
    } catch (error) {
        console.log(error);
        return {
            status: false,
            data: NULL,
            error: error.message
        }
    }
    
    
}
module.exports = {
  loginMiddle,
  checkUser
};
