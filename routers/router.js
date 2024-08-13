const express = require("express");
const controller = require("../controllers/employee.controller.js");

const router = express.Router();

router.post("/register", controller.register);

module.exports = router;
