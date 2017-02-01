const express = require('express'),
    router = express.Router(),
    // mongoose = require('mongoose'),
    User = require('../models/user.model.js'),
    Side = require('../models/side.model.js'),
    Main = require('../models/main.model.js');

// Get all users
router.get('/user', (req, res) => {
    User.find((err, user) => {
        response(res, user, err, 'Get data Failed');
    });
});

// Get specific user
router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    if (!id) error(res, 'Get data Failed');
    User.findById(id, {}, (err, user) => {
        response(res, user, err, 'Get data Failed');
    });
});

// Store user
router.post('/user', (req, res) => {
    let user = req.body;
    // if (!user.name) error(res, 'Store failed');
    user.timetamp = new Date;
    User.create(user, (err, user) => {
        if (err) res.json({error: 'Registration failed'});
        else res.json({uid: user._id});
    });
});

// Update user
router.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let user = req.body;
    if (!user) error(res, 'Update failed');
    User.findByIdAndUpdate(id, {$set: user}, {upsert: true}, (err, user) => {
        response(res, user, err, 'Update failed');
    });

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

// updateById = (user,) => {
//
// };

// Register User
router.post('/register', (req, res) => {
    let user = req.body;
    // if (!user.name) error(res, 'Store failed');
    user.timetamp = new Date;
    User.create(user,
        (err, user) => {
            if (err || !user) res.json({error: 'Registration failed'});
            else res.json({uid: user._id});
        });
});

// Check duplicate email
router.post('/checkemail', (req, res) => {
    let user = req.body;
    User.findOne({email: user.email},
        (err) => {
            if (err) res.json({error: 'Email is already taken'});
            else res.json({success: true})
        }
    )
});

// Change Password
router.post('/changepass', (req, res) => {
    let user = req.body;
    User.update({
            _id: user.uid,
            password: user.oldpassword
        },
        {$set: {password: user.newpassword}},
        {upsert: true},
        (err) => {
            if (err) res.json({error: 'Changing password failed'});
            else res.json({success: true});
        });
});

// Change Pin
router.post('/changepin', (req, res) => {
    let user = req.body;
    User.update(
        {
            _id: user.uid,
            pin: user.oldpin
        },
        {$set: {pin: user.newpin}},
        {upsert: true},
        (err) => {
            if (err) res.json({error: 'Changing pin failed'});
            else res.json({success: true});
        });
});

// Change Name
router.post('/changename', (req, res) => {
    let user = req.body;
    User.update(
        {_id: user.uid},
        {$set: {firstname: user.firstname, lastname: user.lastname}},
        {upsert: true},
        (err) => {
            if (err) res.json({error: 'Changing name failed'});
            else res.json({success: true});
        });
});

// Login
router.post('/login', (req, res) => {
    let user = req.body;
    User.findOne({email: user.email, password: user.password},
        (err, user) => {
            if (err || !user) res.json({error: 'Incorrect email or password'});
            else res.json(user)
        }
    )
});

// Update GCM token
router.post('/gcm', (req, res) => {
    let user = req.body;
    User.update(
        {_id: user.uid},
        {$set: {token: user.token}},
        {upsert: true},
        (err) => {
            if (err) res.json({error: 'Update token failed'});
            else res.json({success: true});
        });
});

// Set Favorite
router.post('/setfav', (req, res) => {
    let user = req.body;
    User.findByIdAndUpdate(user.uid, {$set: user}, {upsert: true}, (err) => {
        if (err) res.json({error: 'Setting favorite menu failed'});
        else res.json({success: true});
    });
});

// Get Favorite
router.post('/getfav', (req, res) => {
    let user = req.body;
    User.findById(user.uid, {_id: 0, favorite: 1}, (err, user) => {
        if (err || !user) {
            res.json({error: 'Getting favorite menu failed'});
        } else {
            res.json(user);
        }
    });
});

// Get Favorite
router.post('/getall', (req, res) => {
    Main.find({}, (err, mains) => {
        if (err || !mains) {
            res.json({error: 'Getting menu failed'});
        } else {
            Side.find({}, (err, sides) => {
                if (err || !sides) res.json({error: 'Getting menu failed'});
                else res.json({main: mains, side: sides});
            });
        }
    });
});

// Get Favorite
router.get('/dump', (req, res) => {
    let dump_file = require('../db_old/main.json');
    for (let i of dump_file) {
        Main.create(i, (err) => {
            if (err) res.json(false);
            else res.json(true);
        });
    }
});


module.exports = router;
