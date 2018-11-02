const PORT = 7070;									//Ðat dia chi Port duoc mo ra de tao ra chuong trinh mang Socket Server
 
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbUrl = "mongodb://localhost:27017/test";
var express = require('express');

var http = require('http') 							//#include thu vien http -
var socketio = require('socket.io')				//#include thu vien socketio

var ip = require('ip');
var ws = require('ws');
var app = express();

var server = http.createServer(app);
var WebSocketServer = ws.Server, wss = new WebSocketServer({port: 80})
var io = socketio(server);	
server.listen(PORT, function () {
    console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
    })

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

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



//giai nen chuoi JSON thanh cac OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}
 
//Gui du lieu thông qua 
function sendTime() {
	
	//Ðay la mot chuoi JSON
	var json = {
	    status: "bi ban", 	//kieu chuoi
        x     : 12,									//so nguyên
		y     : 3.14,							    //so thuc
		time: new Date()							//Ðoi tuong Thoi gian
    }
    io.sockets.emit('atime', json);
}
 
//Khi co mot ket noi duoc tao giua Socket Client và Socket Server
io.on('connection', function(socket) {	//'connection' (1) nay khac gi voi 'connection' (2)
	
    console.log("Connected"); //In ra windowm console la da co mot Socket Client ket noi thanh cong.
	
	//Gui di lenh 'welcome' voi mot tham so la mot bien JSON. Trong bien JSON nay co mot tham so va tham so do ten la message. Kieu du lieu cua tham so là mot chuoi.
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });
	
	//Khi lang nghe duoc lenh "connection" voi mot tham so, va chung ta dat ten tham so la message.
	//'connection' (2)
    socket.on('connection', function(message) {
        console.log(message);
    });
	
	//khi lang nghe duoc lenh "atime" voi mot tham so, dat ten tham so do la data. 
    socket.on('atime', function(data) {
        sendTime();
        console.log(data);
    });

    //when listenned event "right"
	socket.on('right', function(data) {
        console.log(data);
    });
    //when listenned event "left"
	socket.on('left', function(data) {
        console.log(data);
    });
    //when listenned event "down"
	socket.on('down', function(data) {
        console.log(data);
    });
    //when listenned event "up"
	socket.on('up', function(data) {
        console.log(data);
    });
    //when listenned event "ok"
	socket.on('ok', function(data) {
        console.log(data);
    });


	socket.on('arduino', function (data) {
	  io.sockets.emit('arduino', { message: 'R0' });
      console.log(data);
    });
});

  wss.on('connection', function (ws) {
    ws.on('message', function (message) {
      console.log('received: %s', message)
    })
  })
    app.get('/', function (req, res) {
        res.sendfile('/home/sideptr/workspace/PirateKing/source/html/ws.html');
    });
    app.get('/signin', function (req, res) {
     res.sendfile('/home/bang/Workspace/PirateKing/source/html/signin.html');
    });
   