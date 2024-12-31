const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        
      })
      .then((conn) =>
        console.log(`DB is connected with ${conn.connection.host}`)
      )
      
  } catch (err) {
    console.log(err.message);
  }
};