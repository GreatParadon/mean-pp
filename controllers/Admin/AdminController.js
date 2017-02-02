const Admin = require('../../models/Admin');

class AdminController {

    login(req, res) {
        let data = req.body;
        Admin.findOne({username: data.username, password: data.password})
            .exec((err, user) => {
                if (err || !user) res.json({error: 'Cannot Access'});
                else res.json({success: true});
            });
    }
}

module.exports = new AdminController();