var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var StudentModel = require("./../models/studentschema");
// Connecting to database
var query =
  "mongodb+srv://Username:<password>" +
  "@student.tuufn.mongodb.net/College?" +
  "retryWrites=true&w=majority";

var url = "mongodb://localhost:27017/mydb1";

// const db = (query);
const db = url;

mongoose.Promise = global.Promise;
mongoose.connect(
  db,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (error) {
    if (error) {
      console.log("Error!" + error);
    }
  }
);

router.get("/", (req, res) => {
  StudentModel.find((err, data) => {
    if (err) res.status(500).json({ error: err });

    res.json(data);
  });
});

router.post("/", (req, res) => {
  var newStudent = new StudentModel();
  newStudent.StudentId = req.body.StudentId;
  newStudent.Name = req.body.Name;
  newStudent.Roll = req.body.Roll;
  newStudent.Birthday = req.body.Birthday;
  newStudent.Address = req.body.Address;

  newStudent.save((err, data) => {
    if (err) res.status(500).json({ error: err });

    res.json(data);
  });
});

module.exports = router;
