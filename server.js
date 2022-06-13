const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Response = require('./models/Response'),
    path = require('path');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://host.docker.internal/response_handler');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

let routes = require('./routes/responseRoutes'); //importing route
app.use("/", routes);


app.listen(port);

console.log('RESTful API server started on: ' + port);