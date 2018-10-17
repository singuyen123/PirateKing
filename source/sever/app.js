var mosca = require('mosca');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbUrl = "mongodb://localhost:27017/test";
var express = require('express');
//var path = require('path');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var fs = require('fs');
var server_port = 80;

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var moscaSettings = {
  port: 443,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: 'mongodb://localhost:27017/mqtt'
  }
};

var server_mosca = new mosca.Server(moscaSettings);
server_mosca.on('ready', setup);
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
    console.log(result.abc);
    db.close();
  });

});

server_mosca.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server_mosca.on('published', function (packet, client) {
  console.log('Published', packet.payload);
});

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running')
}

app.get('/', (req, res) => {

  res.send('Chat Server is running on port 80')
  });
  server.listen(server_port);
io.sockets.on('connection', function (socket) {
  console.log('connected');
  socket.emit('connection');
  socket.on('connected', function (data) {
    console.log(data);
  });
});



