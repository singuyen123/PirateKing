
const PORT = 3002;
// var MongoClient = require('mongodb').MongoClient;
// var assert = require('assert');
// var mongodbUrl = "mongodb://localhost:27017/Pirateking";
var express = require('express');
//var cookieParser = require('cookie-parser');
//var path = require('path');
var app = express();
// var path = require('path');
app.use(express.static(__dirname + '/'));

////bang
var ip = require('ip');
var http = require('http');					//#include thu vien http -
var socketio = require('socket.io');			//#include thu vien socketio
var server = http.createServer(app);
var io = socketio(server);
server.listen(PORT, function () {
    console.log("Server running at address: " + ip.address() + ":" + PORT)
})
//////
//app.use(cookieParser());
app.get('/', function (req, res) {
    res.sendfile('public/html/index.html');
});

var device = [false, false, false];
io.on('connection', function (socket) {	//'connection' (1) nay khac gi voi 'connection' (2)
    console.log("Connected_nnnambang"); //In ra windowm console la da co mot Socket Client ket noi thanh cong.
    // socket.on('type', function (msg) {
    //     switch (msg) {
    //         case 'login':
    //             socket.on('seasion-info', function (message) {
    //                 MongoClient.connect(mongodbUrl, function (err, db) {
    //                     assert.equal(null, err);

    //                     var querryObj = { 'username': message.username };

    //                     db.collection("user").findOne(querryObj, function (err, result) {
    //                         assert.equal(null, err);
    //                         var dataObject = {};
    //                         if ((result) && (result.seasionKey == message.seasion)) {
    //                             dataObject.seasionStatus = true;
    //                             dataObject.userInfo = message;
    //                             socket.emit('queryLogin', dataObject);
    //                         } else {
    //                             dataObject.seasionKeyStatus = false;
    //                             socket.emit('queryLogin', dataObject);
    //                         }
    //                         db.close();
    //                     });
    //                 });
    //             })
    //             socket.on('login-info', function (message) {
    //                 checkLoginAccount(message.username, message.pass, (seasionKeyObject) => {
    //                     socket.emit('login-request', seasionKeyObject);
    //                 });
    //             });
    //             socket.on('signup-info', function (message) {
    //                 MongoClient.connect(mongodbUrl, function (err, db) {
    //                     assert.equal(null, err);
    //                     db.collection("user").insert({
    //                         username: message.username,
    //                         pass: message.pass,
    //                         email: message.email,
    //                     })
    //                     db.close();
    //                 });
    //             });
    //             break;
    //         case 'pickroom':
    //             socket.emit('device-info', device)
    //             console.log(device);
    //             socket.on('seasion-info', function (message) {
    //                 MongoClient.connect(mongodbUrl, function (err, db) {
    //                     assert.equal(null, err);
    //                     var querryObj = { 'username': message.username };
    //                     db.collection("user").findOne(querryObj, function (err, result) {
    //                         assert.equal(null, err);
    //                         var dataObject = {};
    //                         if ((result) && (result.seasionKey == message.seasion)) {
    //                             dataObject.seasionStatus = true;
    //                             dataObject.userInfo = message;
    //                             socket.emit('queryLogin', dataObject);
    //                         } else {
    //                             dataObject.seasionKeyStatus = false;
    //                             socket.emit('queryLogin', dataObject);
    //                         }
    //                         db.close();
    //                     });
    //                 });
    //             })
    //             socket.on('create-room', function (message) {
    //                 switch (message) {
    //                     case 'device1':
    //                         socket.emit('request-pickRoom', true)
    //                         device[0] = false;
    //                         break;
    //                     case 'device2':
    //                         socket.emit('request-pickRoom', true)
    //                         device[1] = false;
    //                         break;
    //                     default:
    //                         socket.emit('request-pickRoom', false)
    //                         break;
    //                 }
    //             })
    //             socket.on('quick-join', function (message) {
    //                 switch (message) {
    //                     case 'device1':
    //                         socket.emit('request-quickJoin', true)
    //                         device[0] = false;
    //                         break;
    //                     case 'device2':
    //                         socket.emit('request-quickJoin', true)
    //                         device[1] = false;
    //                         break;
    //                     default:
    //                         socket.emit('request-quickJoin', false)
    //                         break;
    //                 }
    //             })
    //             socket.emit('connection', 'device1');
    //             break;
    //         case 'player1':
    //             socket.on('seasion-info', function (message) {
    //                 MongoClient.connect(mongodbUrl, function (err, db) {
    //                     assert.equal(null, err);

    //                     var querryObj = { 'username': message.username };

    //                     db.collection("user").findOne(querryObj, function (err, result) {
    //                         assert.equal(null, err);
    //                         var dataObject = {};
    //                         if ((result) && (result.seasionKey == message.seasion)) {
    //                             dataObject.seasionStatus = true;
    //                             dataObject.userInfo = message;
    //                             socket.emit('queryLogin', dataObject);
    //                         } else {
    //                             dataObject.seasionKeyStatus = false;
    //                             socket.emit('queryLogin', dataObject);
    //                         }
    //                         db.close();

    //                     });
    //                 });
    //             })

    //             break;
    //         case 'player2':
    //             socket.on('seasion-info', function (message) {
    //                 MongoClient.connect(mongodbUrl, function (err, db) {
    //                     assert.equal(null, err);

    //                     var querryObj = { 'username': message.username };

    //                     db.collection("user").findOne(querryObj, function (err, result) {
    //                         assert.equal(null, err);
    //                         var dataObject = {};
    //                         if ((result) && (result.seasionKey == message.seasion)) {
    //                             dataObject.seasionStatus = true;
    //                             dataObject.userInfo = message;
    //                             socket.emit('queryLogin', dataObject);
    //                         } else {
    //                             dataObject.seasionKeyStatus = false;
    //                             socket.emit('queryLogin', dataObject);
    //                         }
    //                         db.close();
    //                     });
    //                 });
    //             })
    //             break;
    //     }
    // })
    // //Gui di lenh 'welcome' voi mot tham so la mot bien JSON. Trong bien JSON nay co mot tham so va tham so do ten la message. Kieu du lieu cua tham so l� mot chuoi.
    // socket.on('device-connection', function (message) {
    //     switch (message.device) {
    //         case 'device1':
    //             device[0] = true;
    //             break;
    //         case 'device2':
    //             device[1] = true;
    //             break;
    //     }
    //     console.log(message);
    // });

    // //Khi lang nghe duoc lenh "connection" voi mot tham so, va chung ta dat ten tham so la message.
    // //'connection' (2)
    // socket.on('control', function (message) {
    //     console.log('1');
    //     socket.broadcast.emit('control-index', message)
    // });
     
    socket.on('connection', function (msg) {
        console.log(msg);
    });

   socket.emit ('Server',"hello");

   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"Dat_thuyen");

   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"Right");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"up");
   socket.emit ('move_ship',"Dat_thuyen");

   //danh thuyen

   socket.emit ('Hit_ship',"Right");
   socket.emit ('Hit_ship',"Right");
   socket.emit ('Hit_ship',"Right");
   socket.emit ('Hit_ship',"up");
   socket.emit ('Hit_ship',"up");
   socket.emit ('Hit_ship',"up");
   socket.emit ('Hit_ship',"up");
   socket.emit ('Hit_ship',"Right");
   socket.emit ('Hit_ship',"hit");


   socket.on('move', function (msg) {
       switch(msg){
           case 'Left': 
            socket.emit ('move_ship',msg);
            break;
           case 'Right':
            socket.emit ('move_ship',msg);
            break;
           case 'down':
            socket.emit ('move_ship',msg);
            break;
           case 'up': 
            socket.emit ('move_ship',msg);
            break;
           case 'Dat_thuyen':
            socket.emit ('move_ship',msg);
            break;
       }
   }); 
});

// function checkLoginAccount(username, password, callback) {
//     var resultObject = {};
//     MongoClient.connect(mongodbUrl, function (err, db) {
//         assert.equal(null, err);

//         var querryObj = { 'username': username };

//         db.collection("user").findOne(querryObj, function (err, result) {
//             assert.equal(null, err);

//             if ((result) && (result.pass == password)) {
//                 resultObject.accountAvailability = true;

//                 // Generate Seasion key
//                 var str = "";
//                 for (; str.length < 32; str += Math.random().toString(36).substr(2));
//                 resultObject.seasionKey = str.substr(0, 32);

//                 var updateValue = {
//                     $set: {
//                         'seasionKey': resultObject.seasionKey,
//                     }
//                 };

//                 console.log(updateValue);
//                 db.collection("user").updateOne(querryObj, updateValue, function (err, res) {
//                     assert.equal(null, err);
//                     console.log("MONGO: 1 document updated");
//                     db.close();
//                 })
//                 callback(resultObject);
//             } else {
//                 resultObject.accountAvailability = false;
//                 callback(resultObject);
//             }

//             db.close();
//         });
//     });
// }

//Gui du lieu th�ng qua 
function sendTime() {

    //�ay la mot chuoi JSON
    var json = {
        status: "bi ban", 	//kieu chuoi
        x: 12,									//so nguy�n
        y: 3.14,							    //so thuc
        //time: new Date()							//�oi tuong Thoi gian
    }
    io.sockets.emit('Bi ban', json);
}


function located() {

    //�ay la mot chuoi JSON
    var json = {
        status: "located", 	//kieu chuoi
    }
    io.sockets.emit('Up', json);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Khi co mot ket noi duoc tao giua Socket Client v� Socket Server


///////







