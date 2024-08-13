const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) =>
        console.log(`DB is connected with ${conn.connection.host}`)
      )
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err.message);
  }
};
