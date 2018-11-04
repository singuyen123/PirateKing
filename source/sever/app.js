
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbUrl = "mongodb://localhost:27017/Pirateking";
var express = require('express');
//var path = require('path');
var app = express();
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({ port: 80 })
var username
var pass

app.get('/', function (req, res) {
  res.sendfile('/home/sideptr/workspace/PirateKing/source/html/signin.html');
});
app.get('/play', function (req, res) {
  res.sendfile('/home/sideptr/workspace/PirateKing/source/html/index.html');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

app.post('/submit', function (req, res) {
  checkLoginAccount(username, pass, function (result) {
      if (result) {
          res.redirect('/play');
      } 
  });
});

function checkLoginAccount(username, password, callback) {
  MongoClient.connect(mongodbUrl, function (err, db) {
      assert.equal(null, err);

      var querryObj = { 'username': username };

      db.collection("user").findOne(querryObj, function (err, result) {
          assert.equal(null, err);

          if ((result) && (result.pass == password)) {
              callback(true);
          } else {
              callback(false);
          }

          db.close();
      });
  });
}
// fired when the mqtt server is ready

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    var message_json = JSON.parse(message);
    if (message_json.stt == 'login') {
      username = message_json.username
      pass = message_json.pass
    }
    else if (message_json.stt == 'signup') {
      console.log(message_json.username);
      MongoClient.connect(mongodbUrl, function (err, db) {
        assert.equal(null, err);
        //var txt = db.collection('mycollection').findOne();
        //console.log(txt);
        // db.collection("mycollection").find({"by":"tutorials point"}).toArray(function(err, result) {
        //   if (err) throw err;
        //   console.log(result);
        //   db.close();
        // });
        db.collection("user").insert({
          username: message_json.username,
          pass: message_json.pass,
          email: message_json.email
        })
      });
    }
  })
})




