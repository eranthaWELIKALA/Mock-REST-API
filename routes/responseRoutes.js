
const responseController = require('../controllers/responseController');
const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Welcome to Mock REST API by Erantha Welikala");
});

// todoList Routes
app.route('/response')
    .get(responseController.getAllResponses)
    .post(responseController.createResponse);


app.route('/response/:responseId')
    .get(responseController.getResponse)
    .put(responseController.updateResponse)
    .delete(responseController.deleteResponse);

app.route('/select/:responseId')
    .get(responseController.selectResponse);

app.all('*', responseController.sendResponse);

module.exports = app