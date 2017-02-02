const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController');

// Register User
router.post('/register', UserController.register);

// Check duplicate email
router.post('/checkemail', UserController.emailValidation);

// Change Password
router.post('/changepass', UserController.changePassword);

// Change Pin
router.post('/changepin', UserController.changePin);

// Change Name
router.post('/changename', UserController.changeName);

// Login
router.post('/login', UserController.login);

// Update GCM token
router.post('/gcm', UserController.setGCMToken);

// Set Favorite
router.post('/setfav', UserController.setFavorite);

// Get Favorite
router.post('/getfav', UserController.getFavorite);

// Get User Id
router.post('/getid', UserController.getUserIdByCode);

// Get All
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

module.exports = router;
