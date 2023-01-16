var mongoose = require("mongoose");
var EmployeeSchema = new mongoose.Schema({
  empname: String,
  salary: Number,
  dateofjoin: Date,
  job: String,
  profilepic: String,
});
module.exports = mongoose.model("employee", EmployeeSchema, "Employees");
