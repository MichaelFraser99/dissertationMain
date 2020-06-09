var express = require('express');
var session = require('express-session');
var sqlConnection = require('../public/javascripts/connection.js');
var router = express.Router();

var accessLevelTable = new sqlConnection('access_level', 'access_id');

async function getDatabaseInformation() {
  pageData = '';
  if (id != '') {
    accessLevel = await accessLevelTable.findAllWhere('access_id', id);
    
    pageData = {
      'accessRightData': {
        'id': accessLevel[0].access_id,
        'name': accessLevel[0].access_name,
        'mAccounts': accessLevel[0].access_manage_accounts,
        'mCategory': accessLevel[0].access_manage_category,
        'mGroup': accessLevel[0].access_manage_group,
        'mInfrastructure': accessLevel[0].access_manage_infrastructure,
        'mPassword': accessLevel[0].access_manage_password,
        'vAccounts': accessLevel[0].access_view_accounts,
        'vCategory': accessLevel[0].access_view_category,
        'vGroup': accessLevel[0].access_view_group,
        'vInfrastructure': accessLevel[0].access_view_infrastructure,
        'vPassword': accessLevel[0].access_view_password
      }
    };
  }
}

router.get('/', async function(req, res, next) {
  id='';

  if (typeof req.query.mode !== 'undefined') {
    if (req.query.mode == "edit") {
      id = req.query.accessID;
    }
  }
  await getDatabaseInformation(id);

  res.render('addAccessRights', {tabtitle: 'Documentation Software', pagetitle: 'Access Rights', search: 'false', topnav: 'none', navSelected: 'accessRights', subNavSelected: 'addAccessRight', data: pageData});
});

module.exports = router;
