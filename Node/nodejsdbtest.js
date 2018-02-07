var Datastore = require('nedb')
  , db = new Datastore({ filename: 'datafile', autoload: true });

db.insert([{ a: 5 }, { a: 42 }], function (err, newDocs) {
  // Two documents were inserted in the database
  // newDocs is an array with these documents, augmented with their _id
});