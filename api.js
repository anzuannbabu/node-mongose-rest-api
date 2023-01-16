var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
const employeesController = require("./controllers/employee.controller");
const studentsController = require("./controllers/student.controller");


//!endpoiints
router.use("/employees", employeesController);
router.use("/students", studentsController);

module.exports = router;
