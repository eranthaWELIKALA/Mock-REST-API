'use strict';
module.exports = function (app) {
    var responseController = require('../controllers/responseController');

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