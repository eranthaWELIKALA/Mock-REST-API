'use strict';
module.exports = function (app) {
    var responseController = require('../controllers/responseController');

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
};