'use strict';

const mongoose = require('mongoose');
const Response = mongoose.model('Response');

exports.getAllResponses = async function (req, res) {
    try {
        let responses = await Response.find({}).exec();
        responses = responses.map(el => {
            el._doc.response = JSON.parse(el._doc.response);
            return el;
        });
        res.json(responses);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createResponse = async function (req, res) {
    try {
        console.log(req.body);
        req.body.response = JSON.stringify(req.body.response);
        let newResponse = new Response(req.body);
        if (newResponse.isSelected) {
            await Response.updateMany({ isSelected: true }, { isSelected: false }).exec();
        }
        let response = await newResponse.save();
        res.json(response);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getResponse = async function (req, res) {
    try {
        let response = await Response.findById(req.params.responseId).exec();
        response._doc.response = JSON.parse(response._doc.response);
        res.json(response);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateResponse = async function (req, res) {
    try {
        if (req.body.isSelected) {
            await Response.updateMany({ isSelected: true }, { isSelected: false }).exec();
        }
        let response = await Response.findOneAndUpdate({ _id: req.params.responseId }, req.body, { new: true }).exec();
        res.json(response);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteResponse = async function (req, res) {
    try {
        await Response.deleteOne({ _id: req.params.responseId }).exec();
        res.json({ message: 'Response successfully deleted' });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.selectResponse = async function (req, res) {
    try {
        await Response.updateMany({ isSelected: true }, { isSelected: false }).exec();
        let response = await Response.findById(req.params.responseId).exec();
        response.isSelected = true;
        response = await Response.findOneAndUpdate({ _id: req.params.responseId }, response, { new: true }).exec();
        res.json(response);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.sendResponse = async function (req, res) {
    try {
        let response = await Response.findOne({ isSelected: true }).exec();
        if (response) res.json(JSON.parse(response.response));
        else res.json(null);
    } catch (err) {
        res.status(500).send(err);
    }
};
