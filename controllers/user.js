const express = require('express'),
    router = express.Router(),
    User = require('../models/user.model.js');

// Get all users
router.get('/user', (req, res) => {
    User.find({}, (err, user) => {
        response(res, user, err, 'Get data Failed');
    });
});

// Get specific user
router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    if (!id) error(res, 'Get data Failed');
    User.findById(id, 'name', (err, user) => {
        response(res, user, err, 'Get data Failed');
    });
});

// Store user
router.post('/user', (req, res) => {
    let user = req.body;
    if (!user.name) error(res, 'Store failed');
    User.create(user, (err, user) => {
        response(res, user, err, 'Store failed');
    });
});

// Update user
router.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let user = req.body;
    if (!user) error(res, 'Update failed');
    User.findByIdAndUpdate(id, {$set: user}, {upsert: true}, (err, user) => {
        response(res, user, err, 'Update failed');
    })

});

// Delete user
router.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    if (!id) error(res, 'Delete Failed');
    User.findByIdAndRemove(id, (err, user) => {
        response(res, user, err, 'Delete Failed');
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
