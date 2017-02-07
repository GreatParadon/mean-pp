const Main = require('../models/Main'),
    Side = require('../models/Side'),
    User = require('../models/User'),
    MealOrder = require('../models/MealOrder'),
    SideOrder = require('../models/SideOrder'),
    MainOrder = require('../models/MainOrder');

class OrderController {

    addToCart(data, oid, res) {
        // console.log(oid);
        MainOrder.create({oid: oid, mid: data.mid},
            (err, created) => {
                if (err) {
                    res.json({error: "Adding item failed"});
                } else {
                    let sides = data.side;
                    if (sides) {
                        let size = sides.length;
                        let count = 1;

                        if (size == 0) {
                            res.json({success: true});
                        }

                        sides.map(side => {
                            SideOrder.create({
                                oid: oid,
                                did: created._id,
                                sid: side.sid,
                                amount: side.amount
                            }, (err) => {
                                if (err) res.json({error: "Adding item failed"});
                                if (size == count) res.json({success: true});
                            });
                            count++;
                        });

                    }
                }
            });
    }

}

class OrderService extends OrderController {

    getAll(req, res) {
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
    }

    addToCartService(req, res) {
        const data = req.body;
        const uid = data.uid;
        User.findById(uid)
            .select('firstname lastname')
            .lean()
            .exec((err, user) => {
                if (err) res.json({error: 'Select user failed'});
                user.buyer = `${user.firstname} ${user.lastname}`;
                MealOrder.findOne({uid: uid, type: 0})
                    .lean()
                    .select('_id buyer').sort('-_id')
                    .exec((err, mealOrder) => {
                        // super.addToCart(data, oid, res);
                        if (err) res.json({error: "Not found"});
                        else if (mealOrder) {
                            mealOrder.oid = mealOrder._id;
                            let oid = mealOrder.oid;
                            super.addToCart(data, oid, res);
                            console.log('Insert new data1', mealOrder);
                        }
                        else
                            MealOrder.create({uid: uid, buyer: user.buyer},
                                (err, created) => {
                                    if (err) res.json({error: "Adding item failed"});
                                    else console.log('Insert new data2', created);
                                    super.addToCart(data, created._id, res);
                                    res.json({success: true});
                                });

                    });

            });
    }

    deleteItem(req, res) {
        const data = req.body;
        MainOrder.findOneAndRemove({_id: data.did})
            .exec((err) => {
                if (err) {
                    console.log(err);
                    res.json({error: "Deleting item failed"});
                } else {
                    res.json({success: true});
                }
            });
    }

    deleteAll(req, res) {
        const data = req.body;
        MealOrder.findOneAndRemove({uid: data.uid, type: 0})
            .exec((err) => {
                if (err) {
                    console.log(err);
                    res.json({error: "Deleting cart failed"});
                } else {
                    res.json({success: true});
                }
            });
    }

}

module.exports = new OrderService();
