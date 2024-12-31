const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./config/db.config.js");

const router = require("./routers/router.js");

dotenv.config();


const app = express();

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/cms", router);

app.get("/", (req, res) => {
  res.send("server is running");
})

app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  dbConnect();
});
