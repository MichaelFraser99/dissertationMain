var express = require('express');
var session = require('express-session');
var sqlConnection = require('../public/javascripts/connection.js');
var router = express.Router();

var infrastructureUserTable = new sqlConnection('infrastructure_user', 'username');
var accessLevelTable = new sqlConnection('access_level', 'access_id');

async function getDatabaseInformation() {
  users = await infrastructureUserTable.findAll();
  accessLevels = await accessLevelTable.findAll();

  pageData = {
    'users': [],
    'accessLevels': []
  }

  for(i=0; i<accessLevels.length; i++) {
    pageData['accessLevels'].push({
      'id': accessLevels[i].access_id,
      'name': accessLevels[i].access_name
    });
  }

  
  for (i=0; i<users.length; i++) {
    accessID = 0;
    for (x=0; x<accessLevels.length; x++) {
      if (users[i].access_id == accessLevels[x].access_id) {
        accessID = accessLevels[x].access_id;
      }
    }
    pageData['users'].push({
      'name': users[i].username,
      'accessID': accessID
    });
  }
}

async function addDatabase(email, accessID) {
  dataToInsert = {
    'dataTypes': ['string', 'int'],
    'username': email,
    'access_id': accessID
  };
  await infrastructureUserTable.insert(dataToInsert);
}

async function deleteUser(id) {
  await infrastructureUserTable.delete(id, true);
}

router.get('/', async function(req, res, next) {

  if (typeof req.query.mode !== 'undefined') {
    if (req.query.mode == "addUser") {
      await addDatabase(req.query.email, req.query.accessID);
    } else if (req.query.mode == "deleteUser") {
      await deleteUser(req.query.id);
    }
  }
  await getDatabaseInformation();
  res.render('userManagement', {tabtitle: 'Documentation Software', pagetitle: 'User Management', topnav: 'none', search: 'false', navSelected: 'userManagement', subNavSelected: 'allUsers', data: pageData});
});

module.exports = router;
