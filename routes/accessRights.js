var express = require('express');
var session = require('express-session');
var sqlConnection = require('../public/javascripts/connection.js');
var router = express.Router();

var accessLevelTable = new sqlConnection('access_level', 'access_id');

async function getDatabaseInformation(searchCriteria) {

  accessLevels = await accessLevelTable.findAll();

/*
------------Page Data Structure------------
pageData = {
  'accessLevels': [
    {
      'id': '*ID*',
      'name': '*NAME*', 
      '*LEVEL NAME*': '*1/0*'
    }
  ]
}
-------------------------------------------
*/
  pageData = {
    'accessLevels': []
  };

  for (i=0; i<accessLevels.length; i++) {
    pageData['accessLevels'].push({
      'id': accessLevels[i].access_id,
      'name': accessLevels[i].access_name,
      'mAccounts': accessLevels[i].access_manage_accounts,
      'mCategory': accessLevels[i].access_manage_category,
      'mGroup': accessLevels[i].access_manage_group,
      'mInfrastructure': accessLevels[i].access_manage_infrastructure,
      'mPassword': accessLevels[i].access_manage_password,
      'vAccounts': accessLevels[i].access_view_accounts,
      'vCategory': accessLevels[i].access_view_category,
      'vGroup': accessLevels[i].access_view_group,
      'vInfrastructure': accessLevels[i].access_view_infrastructure,
      'vPassword': accessLevels[i].access_view_password
    });
  }
}

async function addToDatabase(parameters) {

  if (parameters.mInfrastructure == 'true') {
    mInfrastructure = 1;
  } else {
    mInfrastructure = 0;
  }

  if (parameters.mGroup == 'true') {
    mGroup = 1;
  } else {
    mGroup = 0;
  }

  if (parameters.mCategory == 'true') {
    mCategory = 1;
  } else {
    mCategory = 0
  }

  if (parameters.mPassword == 'true') {
    mPassword = 1;
  } else {
    mPassword = 0;
  }

  if (parameters.mUser == 'true') {
    mUser = 1;
  } else {
    mUser = 0;
  }

  if (parameters.vInfrastructure == 'true') {
    vInfrastructure = 1;
  } else {
    vInfrastructure = 0;
  }

  if (parameters.vGroup == 'true') {
    vGroup = 1;
  } else {
    vGroup = 0;
  }

  if (parameters.vCategory == 'true') {
    vCategory = 1;
  } else {
    vCategory = 0;
  }

  if (parameters.vPassword == 'true') {
    vPassword = 1;
  } else {
    vPassword = 0;
  }

  if (parameters.vUser == 'true') {
    vUser = 1;
  } else {
    vUser = 0;
  }

  dataToInsert = {
    'dataTypes': ['string', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int'],
    'access_name': parameters.name,
    'access_manage_infrastructure': mInfrastructure,
    'access_manage_group': mGroup,
    'access_manage_category': mCategory,
    'access_manage_password': mPassword,
    'access_manage_accounts': mUser,
    'access_view_infrastructure': vInfrastructure,
    'access_view_group': vGroup,
    'access_view_category': vCategory,
    'access_view_password': vPassword,
    'access_view_accounts': vUser
  };
    
  id = await accessLevelTable.insert(dataToInsert);
}

async function updateDatabase(parameters) {
  if (parameters.mInfrastructure == 'true') {
    mInfrastructure = 1;
  } else {
    mInfrastructure = 0;
  }

  if (parameters.mGroup == 'true') {
    mGroup = 1;
  } else {
    mGroup = 0;
  }

  if (parameters.mCategory == 'true') {
    mCategory = 1;
  } else {
    mCategory = 0
  }

  if (parameters.mPassword == 'true') {
    mPassword = 1;
  } else {
    mPassword = 0;
  }

  if (parameters.mUser == 'true') {
    mUser = 1;
  } else {
    mUser = 0;
  }

  if (parameters.vInfrastructure == 'true') {
    vInfrastructure = 1;
  } else {
    vInfrastructure = 0;
  }

  if (parameters.vGroup == 'true') {
    vGroup = 1;
  } else {
    vGroup = 0;
  }

  if (parameters.vCategory == 'true') {
    vCategory = 1;
  } else {
    vCategory = 0;
  }

  if (parameters.vPassword == 'true') {
    vPassword = 1;
  } else {
    vPassword = 0;
  }

  if (parameters.vUser == 'true') {
    vUser = 1;
  } else {
    vPassword = 0;
  }

  dataToInsert = {
    'dataTypes': ['string', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int', 'int'],
    'access_name': parameters.name,
    'access_manage_infrastructure': mInfrastructure,
    'access_manage_group': mGroup,
    'access_manage_category': mCategory,
    'access_manage_password': mPassword,
    'access_manage_accounts': mUser,
    'access_view_infrastructure': vInfrastructure,
    'access_view_group': vGroup,
    'access_view_category': vCategory,
    'access_view_password': vPassword,
    'access_view_accounts': vUser
  };

  await accessLevelTable.update(parameters.id, dataToInsert);
}

async function deleteAccessLevel(id) {
  await accessLevelTable.delete(id);
}

router.get('/', async function(req, res, next) {

  if (typeof req.query.mode !== 'undefined') {
    if (req.query.mode == "addAccessLevel") {
      await addToDatabase(req.query);
    } else if (req.query.mode == "updateAccessLevel") {
      await updateDatabase(req.query);
    } else if (req.query.mode == "deleteAccessLevel") {
      await deleteAccessLevel(req.query.id);
    }
  }
  await getDatabaseInformation();
  res.render('accessRights', {tabtitle: 'Documentation Software', pagetitle: 'Access Rights', search: 'false', topnav: 'none', navSelected: 'accessRights', subNavSelected: 'allAccessRights', data: pageData});
});

module.exports = router;
