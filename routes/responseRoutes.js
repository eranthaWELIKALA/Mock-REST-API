
const responseController = require('../controllers/responseController');
const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const path = require('path');

app.get('/routes', (req, res) => {
    res.sendFile(path.join('/usr/src/app/public/routes.html'));
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