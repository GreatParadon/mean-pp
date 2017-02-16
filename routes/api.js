import express from 'express';
import UserController from '../controllers/UserController';
import BannerController from '../controllers/BannerController';
import SideController from '../controllers/SideController';
import OrderController from '../controllers/OrderController';

const router = express.Router();

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
router.post('/getall', OrderController.getAll);
// Get Side
router.post('/getside', SideController.getSide);
// Add to Cart
router.post('/addtocart', OrderController.addToCartService);
// Delete Item
router.post('/delitem', OrderController.deleteItem);
// Delete All
router.post('/delall', OrderController.deleteAll);
// Get Cart
router.post('/getcart', OrderController.getCart);

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
