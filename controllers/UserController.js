const User = require('../models/User');
// const MealOrder = require('../models/MealOrder');
// const MainOrder = require('../models/MainOrder');
// const Main = require('../models/Main');
// const Side = require('../models/Side');
// const SideOrder = require('../models/SideOrder');
// const Admin = require('../models/Admin');
// const Address = require('../models/Address');
// const Estimote = require('../models/Estimote');
// const Banner = require('../models/Banner');

class UserController {

    register(req, res) {
        let user = req.body;
        user.timetamp = new Date;
        User.create(user,
            (err, user) => {
                if (err || !user) res.json({error: 'Registration failed'});
                else res.json({uid: user._id});
            });
    }

    emailValidation(req, res) {
        let user = req.body;
        User.findOne({email: user.email},
            (err) => {
                if (err) res.json({error: 'Email is already taken'});
                else res.json({success: true})
            });
    }

    changePassword(req, res) {
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
    }

    changePin(req, res) {
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
    }

    changeName(req, res) {
        let user = req.body;
        User.update(
            {_id: user.uid},
            {$set: {firstname: user.firstname, lastname: user.lastname}},
            {upsert: true},
            (err) => {
                if (err) res.json({error: 'Changing name failed'});
                else res.json({success: true});
            });
    }

    login(req, res) {
        let user = req.body;
        User.findOne({email: user.email, password: user.password},
            (err, user) => {
                if (err || !user) res.json({error: 'Incorrect email or password'});
                else res.json(user)
            }
        )
    }

    setGCMToken(req, res) {
        let user = req.body;
        User.update(
            {_id: user.uid},
            {$set: {token: user.token}},
            {upsert: true},
            (err) => {
                if (err) res.json({error: 'Update token failed'});
                else res.json({success: true});
            });
    }

    setFavorite(req, res) {
        let user = req.body;
        User.findByIdAndUpdate(user.uid, {$set: user}, {upsert: true}, (err) => {
            if (err) res.json({error: 'Setting favorite menu failed'});
            else res.json({success: true});
        });
    }

    getFavorite(req, res) {
        let user = req.body;
        User.findById(user.uid, {_id: 0, favorite: 1}, (err, user) => {
            if (err || !user) res.json({error: 'Getting favorite menu failed'});
            else res.json(user);
        });
    }

    getUserIdByCode(req, res) {
        let input = req.body;
        User.findOne({code: input.code})
            .select('uid')
            .exec((err, user) => {
                if (err || !user)
                    res.json({error: 'Getting user ID failed'});
                else
                    res.json({uid: user._id});
            });
    }

    // ChangeUid(req, res) {
    //     MealOrder.find()
    //         .select('_id oid')
    //         .exec((err, users) => {
    //             for (let user of users) {
    //                 SideOrder.update(
    //                     {oid: user.oid},
    //                     {$set: {oid: user._id}},
    //                     {multi: true},
    //                     (err, update) => {
    //                         if (err) res.json({error: 'Failed'});
    //                         console.log(update);
    //                     });
    //             }
    //             res.json({success: 'Success'});
    //         })
    // }
    //
    // dump(req, res) {
    //     let json = require('../db_old/estimote.json');
    //     json.map(collection => {
    //         Estimote.create(collection,
    //             (err, collection) => {
    //                 if (err || !collection) res.json({error: 'Registration failed'});
    //             });
    //     });
    //     res.json({uid: 'ผ่าน'});
    //
    // }
    // collection(req, res) {
    //     Side.find()
    //         .select('_id sid')
    //         .lean()
    //         .exec(
    //             (err, collection) => {
    //                 res.json(collection);
    //             }
    //         )
    // }

}

module.exports = new UserController();