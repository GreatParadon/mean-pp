const express = require('express'),
    router = express.Router(),
    UserController = require('../controllers/UserController'),
    BannerController = require('../controllers/BannerController'),
    SideController = require('../controllers/SideController'),
    OrderService = require('../controllers/OrderController');

//======= User =======//
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

//======= Order =======//
// Get All
router.post('/getall', OrderService.getAll);
// Get Side
router.post('/getside', SideController.getSide);
// Add to Cart
router.post('/addtocart', OrderService.addToCartService);
router.post('/delitem', OrderService.deleteItem);
router.post('/delall', OrderService.deleteAll);

//======= Banner =======//
// Get Banner
router.get('/getbanner', BannerController.getBanner);

// router.get('/updateuid', UserController.ChangeUid);
// router.get('/dump', UserController.dump);
// router.get('/collection', UserController.collection);
// const fetch = require('whatwg-fetch');
// router.get('/fetch', (req, res) => {
//     return fetch('localhost:4000/api/getbanner')
//         .then(response => console.log(response));
// });

module.exports = router;
