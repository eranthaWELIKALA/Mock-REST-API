require("dotenv").config();
const express = require('express'),
    app = express()
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Response = require('./models/Response'),
    path = require('path');

app.disable("x-powered-by");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.MONGODB_SERVER}` || 'mongodb://host.docker.internal/response_handler', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

let routes = require('./routes/responseRoutes'); //importing route
app.use("/", routes);


app.listen(port);

console.log('RESTful API server started on: ' + port);
console.log('MongoDB server: ' + process.env.MONGODB_SERVER + '/mock-rest-api');