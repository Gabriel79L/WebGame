var express = require('express');
var bodyParser = require('body-parser');

//change code 
//var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost/data");

var routes = require("./routes");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/js', express.static('./public/js'));
app.use('/images', express.static('./public/images'));
app.use('/', express.static('./public/views'));
app.use(routes);

var port = process.env.PORT || 3003;
app.listen(port);