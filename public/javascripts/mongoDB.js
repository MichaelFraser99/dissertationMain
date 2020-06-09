const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'whiteLightDocumentation';

module.exports = function(collection) {
  this.collection = collection;
  this.data = [];

  this.getCollectionName = function() {
    return this.collection;
  }

  this.findAll = function() {
    return new Promise(function(resolve, reject) {
      client = new MongoClient(url);
      client.connect(function(err) {
        const db = client.db(dbName);
  
        workingCollection = db.collection(collection);
        workingCollection.find({}).toArray(function(err, docs) {
          assert.equal(err, null);
          resolve(docs);
        });  
      });
      client.close();  
    });
  }

  this.findWhere = function(criteria) {
    return new Promise(function(resolve, reject) {
      client = new MongoClient(url);
      client.connect(function(err) {
        const db = client.db(dbName);
        
        workingCollection = db.collection(collection);

        workingCollection.find(criteria).toArray(function(err, docs) {
          assert.equal(err, null);
          resolve(docs);
        });
      });
      client.close();
    });
  }

  //Keys - array of data keys
  //Values - array of data values that correspond to keys
  //Types - array of data types (will be ignored if blank array is parsed)
  this.insert = function(keys, values, types) {
    return new Promise(function(resolve, reject) {

      if (types.length == 0) {
        objectToAdd = {};
        for (i=0; i<keys.length; i++) {
          objectToAdd[keys[i]] = values[i];
        }
      } else {
        objectToAdd = {};
        for (i=0; i<keys.length; i++) {
          objectToAdd[keys[i]] = {value: values[i], type: types[i]};
        }
      }

      client = new MongoClient(url);
      client.connect(function(err) {
        const db = client.db(dbName);

        workingCollection = db.collection(collection);
        workingCollection.insertOne(
          objectToAdd
        , function(err, result) {
          assert.equal(err, null);
          resolve([]);
        });
      });
      client.close();
    });
  }

  this.delete = function(criteria) {
    return new Promise(function(resolve, reject) {
      client = new MongoClient(url);
      client.connect(function(err) {
        const db = client.db(dbName);

        workingCollection = db.collection(collection);
        workingCollection.deleteOne(criteria);

        resolve([]);
      });
      client.close();
    });
  }
}