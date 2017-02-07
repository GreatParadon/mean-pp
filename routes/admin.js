const express = require('express'),
    router = express.Router(),
    AdminController = require('../controllers/Admin/AdminController');

router.get('/admin/:page', (req, res) => {
    res.render('admin/' + req.params.page + '.html');
});

//Admin Login
router.post('/admin/access', AdminController.login);


module.exports = router;