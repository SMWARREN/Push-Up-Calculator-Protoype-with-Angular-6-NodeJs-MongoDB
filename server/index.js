const express = require('express');
const _ = require('lodash');

const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let db;

MongoClient.connect('mongodb://admin:admin@ds235860.mlab.com:35860/pushups', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(process.env.PORT || 3000, () => {
    console.log('Push Up API Service');
  });
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  next();
});

app.get('/', (req, res) => {
  db.collection('pushups').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.render('index.ejs', {
      pushups: result,
    });
  });
});

app.get('/api/readall', (req, res) => {
  db.collection('pushups').find().toArray((err, result) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        pushups: result,
      });
    }
  });
});

app.post('/api/find', (req, res) => {
  db.collection('pushups').find({
    amount: req.body.amount,
    week: req.body.week,
  }).toArray((err, result) => {
    if (err) {
      res.json({
        error: err,
      });
    } else {
      res.json({
        pushups: result,
        message: 'Found Item',
      });
    }
  });
});

app.post('/api/create', (req, res) => {
  if (req.body.amount && req.body.week) {
    db.collection('pushups').save(req.body, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        res.json({
          pushups: result,
          message: 'Item Created',
        });
      }
    });
  } else {
    res.json({
      message: 'Insert all Provided Fields',
      requiredFields: ['amount', 'week'],
    });
  }
});

app.put('/api/update', (req, res) => {
  db.collection('pushups')
    .findOneAndUpdate({
      week: req.body.week,
    }, {
      $set: {
        amount: req.body.amount,
        week: req.body.week,
      },
    }, {
      sort: {
        _id: -1,
      },
      upsert: true,
    }, (err, result) => {
      if (err) {
        res.json({
          error: err,
        });
      } else {
        res.json({
          pushups: result,
          message: 'Item Updated',
        });
      }
    });
});

app.delete('/api/delete', (req, res) => {
  db.collection('pushups').findOneAndDelete({
    week: req.body.week,
  }, (err, result) => {
    if (err) {
      res.json({
        error: err,
      });
    } else if (result.value === null) {
      res.json({
        error: 'No Result Has Been Found',
      });
    } else {
      res.json({
        pushups: result,
        message: 'Deleted The First Item That Matches Params',
      });
    }
  });
});
