const { Log } = require("../Models/Logs");
const axios = require("axios");
const https = require("https");
const moment = require("moment");
const addLogs = async (req, res) => {
  try {
    const { authToken } = req.query;
    const fetchLogs = await axios.get(`${process.env.TINA_API_URL}/logs`, {
      headers: {
        Authorization: authToken,
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    //checking of there is anny collection present
    const countCollection = await Log.count();
    if (countCollection === 0) {
      //adding all the values to the database
      for (var i = 0; i < fetchLogs.data.length; i++) {
        var dateString = moment.unix(fetchLogs.data[i].time).utc().toString();
        console.log(dateString);
        const mutateLogs = await new Log({...fetchLogs.data[i], 'timeStamp': dateString});
        await mutateLogs.save();
        console.log(`${i}th Log Inserted`);
      }
      console.log("Job Completed");
      res.status(200).json(
          {
              status: true,
              message: "Logs Inserted SuccessFully",
              count: fetchLogs.data.length,
              data: fetchLogs.data
          }
      )
    }
    else 
    {
        const findLogs = await Log.find({}, {}, {sort:
        {
          'timeStamp': -1
        }});
        const timeStamp = findLogs[0].time;
        console.log(timeStamp);
        console.log(fetchLogs.data[4].time);
        console.log("new Time : ", moment.unix(1653125704).utc().toString())
        var i=0;
        while(true)
        {
            if(fetchLogs.data[i].time != timeStamp)
            {
                var dateString = moment.unix(fetchLogs.data[i].time).format("MM/DD/YYYY");
                console.log(dateString);
                console.log(fetchLogs.data[i]);
                // const addJob = await new Log({...fetchLogs.data[i], 'timeStamp': dateString});
                // await addJob.save();
                console.log(`${i+1}th new Log Inserted `);
                i++;
            }
            else 
            {
                break;
            }            
        }
        res.status(200).json(
            {
                status: true,
                message: "New Logs Inserted SuccessFully",
                newLogsCount: i,
                count: await Log.count()
            }
        )

        
    }
    
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went Wrong",
      error: error.message,
    });
  }
};


const deleteAllLogs = async (req, res)=>
{
    try {
        const deleteAllLogs = await Log.deleteMany();
        res.send(true);
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json(
            {
                status: false,
                message: "Something Went Wrong",
                error: error.message
            }
        )
    }
}
module.exports = {
  addLogs,
  deleteAllLogs
};
