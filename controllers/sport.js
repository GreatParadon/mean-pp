const express = require('express'),
    router = express.Router(),
    Sport = require('../models/sport.model.js');

// Get all sports
router.get('/sport', (req, res) => {
    Sport.find({}, (err, sport) => {
        response(res, sport, err, 'Get data Failed');
    });
});

// Get specific sport
router.get('/sport/:id', (req, res) => {
    let id = req.params.id;
    if (!id) error(res, 'Get data Failed');
    Sport.findById(id, 'name', (err, sport) => {
        response(res, sport, err, 'Get data Failed');
    });
});

// Store sport
router.post('/sport', (req, res) => {
    let sport = req.body;
    if (!sport.name) error(res, 'Store failed');
    Sport.create(sport, (err, sport) => {
        response(res, sport, err, 'Store failed');
    });
});

// Update sport
router.put('/sport/:id', (req, res) => {
    let id = req.params.id;
    let sport = req.body;
    if (!sport) error(res, 'Update failed');
    Sport.findByIdAndUpdate(id, {$set: sport}, {upsert: true}, (err, sport) => {
        response(res, sport, err, 'Update failed');
    })

});

// Delete sport
router.delete('/sport/:id', (req, res) => {
    let id = req.params.id;
    if (!id) error(res, 'Delete Failed');
    Sport.findByIdAndRemove(id, (err, sport) => {
        response(res, sport, err, 'Delete Failed');
    });
});

function response(res, result, err, errMsg) {
    if (err) {
        console.log(err);
        error(res, errMsg);
    } else {
        success(res, result);
    }
}

function success(res, result) {
    res.json({'success': true, result});
}

function error(res, errMsg) {
    res.json({'success': false, 'msg': errMsg});
}

module.exports = router;
