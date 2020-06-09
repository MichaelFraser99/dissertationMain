var express = require('express');
var session = require('express-session');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('editAccessRights', {tabtitle: 'Documentation Software', pagetitle: 'Access Rights', search: 'false', topnav: 'none', navSelected: 'accessRights', subNavSelected: 'none'});
});

module.exports = router;
