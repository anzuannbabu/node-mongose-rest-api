const express=require('express');
const bodyParser=require('body-parser');
const api = require('./api');
const port=3000;
const app=express();

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));
// Parses the text as json
app.use(bodyParser.json());

/* include external files */
app.use('/api', api);


app.listen(port, function() {
    console.log("Server is listening at port:" + port);
   });