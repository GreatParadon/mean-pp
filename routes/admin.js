import express from 'express';
import AdminController from '../controllers/Admin/AdminController';
import MealOrder from '../models/MealOrder';
import MainOrder from '../models/MainOrder';
import Main from '../models/Main';

const router = express.Router();

router.get('/admin/:page', (req, res) => {
    res.render('admin/' + req.params.page + '.html');
});

//Admin Login
router.post('/admin/access', AdminController.login);

// router.get('/test', (req, res) => {
//     MainOrder.find()
//         .select('_id oid mid type')
//         .exists('mid')
//         .populate({
//             path: 'mid',
//             select: '_id title image price sidedish'
//         })
//         .lean()
//         .exec((err, mainOrder) => {
//             if (err) res.json({error: 'Failed'});
//             else {
//                 mainOrder.map(mo => {
//
//                     mo.did = mo._id;
//                     mo.title = mo.mid.title;
//                     mo.image = mo.mid.image;
//                     mo.price = mo.mid.price;
//                     mo.sidedish = mo.mid.sidedish;
//                     mo.mid = mo.mid._id;
//
//                     delete mo._id;
//
//                 });
//                 res.json({success: mainOrder});
//             }
//         });
// });

module.exports = router;