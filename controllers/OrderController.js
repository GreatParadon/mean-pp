import Main from '../models/Main';
import Side from '../models/Side';
import User from '../models/User';
import MealOrder from '../models/MealOrder';
import SideOrder from '../models/SideOrder';
import MainOrder from '../models/MainOrder';

const OrderController = () => {

    const addToCart = (data, oid, res) => {
        console.log(oid);
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
    };

    return {
        getAll: (req, res) => {
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
        },

        addToCartService: (req, res) => {
            const data = req.body;
            const uid = data.uid;
            User.findById(uid, 'firstname lastname', {lean: true}, (err, user) => {
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
                            addToCart(data, oid, res);
                            console.log('Insert new data1', mealOrder);
                        }
                        else
                            MealOrder.create({uid: uid, buyer: user.buyer},
                                (err, created) => {
                                    if (err) res.json({error: "Adding item failed"});
                                    else console.log('Insert new data2', created);
                                    addToCart(data, created._id, res);
                                    res.json({success: true});
                                });

                    });

            });
        },

        getCart: (req, res) => {
            const data = req.body;
            const uid = data.uid;
            const type = 0;

            const whereType = (type == -1 ? {type: {$gt: 1}} : {type: type});
            const whereId = (uid ? {uid: uid} : {_id: uid});

            console.log(uid, type);

            MealOrder.findOne()
                .where('type').equals(type)
                .where('uid').equals(uid)
                .select('_id buyer type timestamp')
                .sort('-_id')
                .lean()
                .exec((err, mealOrder) => {
                    console.log('Log Meal Order', err, mealOrder);
                    if (err) res.json({error: 'Getting cart failed'});
                    else {
                        mealOrder.orders = [];
                        MainOrder.find({oid: mealOrder._id})
                            .select('_id oid mid type')
                            .exists('mid')
                            .sort('-_id')
                            .populate({
                                path: 'mid',
                                select: '_id title image price sidedish',
                                match: {disable: 0},
                                options: {lean: true}
                            })
                            .lean()
                            .exec((err, mainOrder) => {
                                // console.log('Log Main Order', err, mainOrder);
                                if (err) res.json({error: 'Getting cart failed'});
                                else {

                                    const moLength = mainOrder.length;
                                    let moCount = 1;

                                    mainOrder.map(mo => {

                                        SideOrder.find()
                                            .where('oid').equals(mo.oid)
                                            .where('amount').gt(0)
                                            .select('_id sid did amount')
                                            // .exists('sid')
                                            .sort('-_id')
                                            .populate({
                                                path: 'sid',
                                                select: '_id title image price',
                                                match: {disable: 0},
                                                options: {lean: true}
                                            })
                                            .lean()
                                            .exec((err, sideOrder) => {

                                                console.log('Log Side Order', err, sideOrder);
                                                mo.did = mo._id;
                                                mo.title = mo.mid.title;
                                                mo.image = mo.mid.image;
                                                mo.price = mo.mid.price;
                                                mo.sidedish = mo.mid.sidedish;
                                                mo.mid = mo.mid._id;
                                                mo.total = mo.price;
                                                mo.side = [];

                                                sideOrder.map(so => {
                                                    so.title = so.sid.title;
                                                    so.image = so.sid.image;
                                                    so.price = so.sid.price;
                                                    so.total = so.amount * so.sid.price;

                                                    so.sid = so._id;
                                                    delete so._id;
                                                    if (mo.did == so.did) {
                                                        mo.side.push(so);
                                                        // mealOrder.orders.total += so.sid.price * so.amount;
                                                        delete so.did;
                                                    }
                                                });

                                                delete mo._id;
                                                delete mo.oid;

                                                mealOrder.orders.push(mo);

                                                console.log('Test', moLength, moCount);

                                                if (moLength == moCount) res.json({success: mealOrder});
                                                else moCount++;

                                            });

                                    });

                                }
                            });
                    }
                });

        },

        deleteItem: (req, res) => {
            const data = req.body;
            MainOrder.findOneAndRemove({_id: data.did},
                (err, deleted) => {
                    if (err) {
                        console.log(err);
                        res.json({error: "Deleting item failed"});
                    } else {
                        console.log(deleted);
                        res.json({success: true});
                    }
                });
        },

        deleteAll: (req, res) => {
            const data = req.body;
            MealOrder.remove({uid: data.uid, type: 0}, {multi: true},
                (err, deleted) => {
                    if (err) {
                        console.log(err);
                        res.json({error: "Deleting cart failed"});
                    } else {
                        console.log(deleted);
                        res.json({success: true});
                    }
                });
        }
    }

};

module.exports = OrderController();
