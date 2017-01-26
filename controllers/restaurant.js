const express = require('express'),
    router = express.Router(),
    Restaurant = require('../models/restaurant.model.js');

// Get all restaurants
router.get('/restaurant', (req, res) => {
    Restaurant.find({}, (err, restaurant) => {
        response(res, restaurant, err, 'Get data Failed');
    });
});

// Get specific restaurant
router.get('/restaurant/:id', (req, res) => {
    let id = req.params.id;
    if (!id) error(res, 'Get data Failed');
    Restaurant.findById(id, 'name', (err, restaurant) => {
        response(res, restaurant, err, 'Get data Failed');
    });
});

// Store restaurant
router.post('/restaurant', (req, res) => {
    let restaurant = req.body;
    if (!restaurant.name) error(res, 'Store failed');
    Restaurant.create(restaurant, (err, restaurant) => {
        response(res, restaurant, err, 'Store failed');
    });
});

// Update restaurant
router.put('/restaurant/:id', (req, res) => {
    let id = req.params.id;
    let restaurant = req.body;
    if (!restaurant) error(res, 'Update failed');
    Restaurant.findByIdAndUpdate(id, {$set: restaurant}, {upsert: true}, (err, restaurant) => {
        response(res, restaurant, err, 'Update failed');
    })

});

// Delete restaurant
router.delete('/restaurant/:id', (req, res) => {
    let id = req.params.id;
    if (!id) error(res, 'Delete Failed');
    Restaurant.findByIdAndRemove(id, (err, restaurant) => {
        response(res, restaurant, err, 'Delete Failed');
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
