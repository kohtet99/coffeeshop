const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const dbConnect = require("./configs/db.config.js");
const controller = require("./controllers/customer.controller.js");
const router = require("./routers/router.js");

dotenv.config();
dbConnect();

const app = express();

const corsOptions = {
  origin: ["http://localhost:8081"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/employee", router);

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/post", controller.create);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
