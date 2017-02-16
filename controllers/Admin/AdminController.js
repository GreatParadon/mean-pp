import Admin from '../../models/Admin';

const AdminController = () => {

    return {
        login(req, res) {
            let data = req.body;
            Admin.findOne({username: data.username, password: data.password},
                (err, user) => {
                    if (err || !user) res.json({error: 'Cannot Access'});
                    else res.json({success: true});
                    console.log(err, user);
                });
        }
    }

};

module.exports = AdminController();