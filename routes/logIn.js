var express = require('express');
var session = require('express-session');
var sqlConnection = require('../public/javascripts/connection.js');
var router = express.Router();
var fs = require('fs');

var infrastructureTable = new sqlConnection('infrastructure', 'infrastructure_id');

async function validationLogin() {
/*
------------Page Data Structure------------
pageData = {
}
-------------------------------------------
*/
  pageData = {
  };
  return true;
}

router.get('/', async function(req, res, next) {
  res.render('logIn', {tabtitle: 'Documentation Software', invalidLogin: 'false'});
});

router.post('/', async function(req,res, next) {
  valid = await validationLogin();
  if (valid) {
    res.render('logIn', {tabTitle: 'Documentation Software', invalidLogin: 'false'});
  } else {
    res.render('logIn', {tabtitle: 'Documentation Software', invalidLogin: 'true'});
  }
});

module.exports = router;
