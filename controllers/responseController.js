'use strict';


var mongoose = require('mongoose'),
    Response = mongoose.model('Response');

exports.getAllResponses = function (req, res) {
    Response.find({}, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });
};




exports.createResponse = function (req, res) {
    console.log(req.body);
    req.body.response = JSON.stringify(req.body.response);
    var newResponse = new Response(req.body);
    newResponse.save(function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });
};


exports.getResponse = function (req, res) {
    Response.findById(req.params.responseId, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });
};


exports.updateResponse = function (req, res) {
    Response.findOneAndUpdate({ _id: req.params.responseId }, req.body, { new: true }, function (err, response) {
        if (err)
            res.send(err);
        res.json(response);
    });
};


exports.deleteResponse = function (req, res) {
    Response.remove({
        _id: req.params.responseId
    }, function (err, response) {
        if (err)
            res.send(err);
        res.json({ message: 'Response successfully deleted' });
    });
};


exports.selectResponse = function (req, res) {
    Response.updateMany({ isSelected: true }, { isSelected: false }, function (err, response) {
        if (err)
            res.send(err);
    });
    Response.findById(req.params.responseId, function (err, response) {
        if (err)
            res.send(err);
        response.isSelected = true;
        Response.findOneAndUpdate({ _id: req.params.responseId }, response, { new: true }, function (err, response) {
            if (err)
                res.send(err);
            res.json(response);
        });
    });
};


exports.sendResponse = function (req, res) {
    Response.findOne({ isSelected: true }, function (err, response) {
        if (err)
            res.send(err);
        res.json(JSON.parse(response.response));
    });
};