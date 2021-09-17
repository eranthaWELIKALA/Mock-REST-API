var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Response = require('./models/Response');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/response_handler');


app.use(express.urlencoded({extended: true}));
app.use(express.json())

var routes = require('./routes/responseRoutes'); //importing route
routes(app); //register the route


app.listen(port);

console.log('RESTful API server started on: ' + port);