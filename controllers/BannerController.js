const Banner = require('../models/Banner');

class BannerController {

    getBanner(req, res) {
        Banner.find()
            .select({image: 1, _id: 0})
            .exec((err, banners) => {
                let bannerImage = [];
                for (let banner of banners) {
                    bannerImage.push(banner.image);
                }
                res.json({banner: bannerImage});
            });
    }

}


module.exports = new BannerController();