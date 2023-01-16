var mongoose = require("mongoose");
var express = require("express");
var router = express.Router();
var EmployeeModel = require("./../models/employeeschema");

var app = express();

var multer = require("multer"); //Step 1
var path = require("path");

app.use(express.static(__dirname)); //Step 2

//Step 3: Configure multer
var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    //Default folder config
    cb(null, __dirname + "/../uploads");
  },
  filename: function (req, file, cb) {
    //Attach timestamp beside file name
    var datetimestamp = Date.now();
    cb(
      null,
      file.originalname.replace(path.extname(file.originalname)) +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

var uploadEmployeeProfile = multer({
  //multer settings
  storage: storage,
}).single("file");

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

//!get all employees
router.get("/", (req, res) => {
  EmployeeModel.find((err, data) => {
    if (err) res.status(500).json({ error: err });

    res.json(data);
  });
});

//!get employee by id
router.get("/:id", (req, res) => {
  const query = { _id: req.params.id };
  EmployeeModel.findOne(query, (err, data) => {
    if (err) res.status(500).json({ error: err });

    res.json(data);
  });
});

//!delete employee
router.delete("/:id", (req, res) => {
  EmployeeModel.findByIdAndRemove((req.params.id), (err, data) => {
    if (err) res.status(500).json({ error: err });

    res.json(data);
  });
});


//!add new employee
router.post("/", (req, res) => {
  uploadEmployeeProfile(req, res, function (err) {
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }

    var filePath = `uploads/${req.file.filename}`; //this is the file path

    var model = new EmployeeModel();
    model.empname = req.body.empname;
    model.salary = req.body.salary;
    model.dateofjoin = req.body.dateofjoin;
    model.job = req.body.job;
    model.profilepic = filePath;

    model.save((err, data) => {
      if (err) res.status(500).json({ error: err });

      res.json(data);
    });
  });
});

//!update employee details
router.put("/:id", (req, res) => {
    //find the details and update the details
    let updateEmployee = req.body;
    EmployeeModel.findByIdAndUpdate(req.params.id,updateEmployee,(err,result) =>{
        if (err) res.status(500).json({ error: err });

        res.json(result)
    });
});

module.exports = router;
