const Main = require('../models/Main');
const Side = require('../models/Side');

class SideController {

    getSide(req, res) {
        const data = req.body;
        Main.findById(data.mid)
            .where('disable').equals(0)
            .select('dish_image sidedish')
            .exec((err, main) => {
                if (err || !main) {
                    res.json({error: 'Getting side dish failed'});
                } else {
                    const sidedish = main.sidedish.split(',');
                    const size = sidedish.length;
                    let count = 1;
                    const sideList = [];
                    sidedish.map(sid => {
                        Side.findById(sid.replace(/ /g, ''), {_id: 0})
                            .select('title price image dish_image')
                            .sort('_id')
                            .lean()
                            .exec((err, sides) => {
                                if (err) {
                                    res.json({error: 'Getting side dish failed'});
                                } else {
                                    sides.sid = sid;
                                    sideList.push(sides);
                                    if (count == size) {
                                        res.json({dish_image: main.dish_image, side: sideList});
                                    }
                                    count++;
                                }
                            });
                    });

                }
            });
    }

}

module.exports = new SideController();