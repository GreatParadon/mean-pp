const express = require('express'),
    router = express.Router(),
    Banner = require('../models/Banner.js');

// Get Banner
router.post('/getbanner', (req, res) => {
    Banner.find()
        .select({image: 1, _id: 0})
        .exec((err, banners) => {
            let bannerImage = [];
            for (let banner of banners) {
                bannerImage.push(banner.image);
            }
            res.json({banner: bannerImage});
        });
});

module.exports = router;