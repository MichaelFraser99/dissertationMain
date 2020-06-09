var express = require('express');
var session = require('express-session');
var sqlConnection = require('../public/javascripts/connection.js');
var router = express.Router();

var accessLevelTable = new sqlConnection('access_level', 'access_id');

async function getDatabaseInformation() {

  accessLevels = await accessLevelTable.findAll();

  pageData = {
    'accessLevels': []
  };

  for (i=0; i<accessLevels.length; i++) {
    pageData['accessLevels'].push({
      'id': accessLevels[i].access_id,
      'name': accessLevels[i].access_name
    });
  }
}

router.get('/', async function(req, res, next) {
  await getDatabaseInformation();

  res.render('addUser', {tabtitle: 'Documentation Software', pagetitle: 'Add User', topnav: 'none', search: 'false', navSelected: 'userManagement', subNavSelected: 'addUser', data: pageData});
});

module.exports = router;
