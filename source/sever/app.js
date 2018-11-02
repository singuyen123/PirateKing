var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbUrl = "mongodb://localhost:27017/test";
var express = require('express');
//var path = require('path');
var app = express();
var server = require('http').createServer(app);
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 80})

MongoClient.connect(mongodbUrl, function (err, db) {
  assert.equal(null, err);
  //var txt = db.collection('mycollection').findOne();
  //console.log(txt);
  // db.collection("mycollection").find({}).toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   db.close();
  // });

  db.collection("mycollection").findOne({}, function (err, result) {
    if (err) throw err;
    // console.log(result.abc);
    db.close();
  });

});

// fired when a message is received
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })
})

app.get('/', function (req, res) {
  res.sendfile('/home/bang/Workspace/PirateKing/source/sever/signin.html');
});
app.get('/signin', function (req, res) {
  res.sendfile('/home/bang/Workspace/PirateKing/source/html/signin.html');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})



