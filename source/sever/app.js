
const PORT = 3000;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbUrl = "mongodb://localhost:27017/Pirateking";
var express = require('express');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();
//var path = require('path');
app.use(express.static(__dirname + '/'));

////bang
var ip = require('ip');
var http = require('http');					//#include thu vien http -
var socketio = require('socket.io');			//#include thu vien socketio
var server = http.createServer(app);
var io = socketio(server);
var map1, map2, turn = 0, ready=0;
var room = [{}];
server.listen(PORT, function () {
    console.log("Server running at address: " + ip.address() + ":" + PORT)
})
//////
//app.use(cookieParser());
app.get('/', function (req, res) {
    res.sendfile('public/html/signin.html');
});

var device = [false, false, false];
io.on('connection', function (socket) {	//'connection' (1) nay khac gi voi 'connection' (2)
    console.log("Connected_nnnambang"); //In ra windowm console la da co mot Socket Client ket noi thanh cong.
    socket.on('type', function (msg) {
        switch (msg) {
            case 'login':
                socket.on('seasion-info', function (message) {
                    MongoClient.connect(mongodbUrl, function (err, db) {
                        assert.equal(null, err);

                        var querryObj = { 'username': message.username };

                        db.collection("user").findOne(querryObj, function (err, result) {
                            assert.equal(null, err);
                            var dataObject = {};
                            if ((result) && (result.seasionKey == message.seasion)) {
                                dataObject.seasionStatus = true;
                                dataObject.userInfo = message;
                                socket.emit('queryLogin', dataObject);
                            } else {
                                dataObject.seasionKeyStatus = false;
                                socket.emit('queryLogin', dataObject);
                            }
                            db.close();
                        });
                    });
                })
                socket.on('login-info', function (message) {
                    checkLoginAccount(message.username, message.pass, (seasionKeyObject) => {
                        socket.emit('login-request', seasionKeyObject);
                    });
                });
                socket.on('signup-info', function (message) {
                    MongoClient.connect(mongodbUrl, function (err, db) {
                        assert.equal(null, err);
                        db.collection("user").insert({
                            username: message.username,
                            pass: message.pass,
                            email: message.email,
                        })
                        db.close();
                    });
                });
                break;
            case 'pickroom':
                socket.emit('device-info', device)
                console.log(device);
                socket.on('seasion-info', function (message) {
                    MongoClient.connect(mongodbUrl, function (err, db) {
                        assert.equal(null, err);
                        var querryObj = { 'username': message.username };
                        db.collection("user").findOne(querryObj, function (err, result) {
                            assert.equal(null, err);
                            var dataObject = {};
                            if ((result) && (result.seasionKey == message.seasion)) {
                                dataObject.seasionStatus = true;
                                dataObject.userInfo = message;
                                socket.emit('queryLogin', dataObject);
                            } else {
                                dataObject.seasionKeyStatus = false;
                                socket.emit('queryLogin', dataObject);
                            }
                            db.close();
                        });
                    });
                })
                socket.on('create-room', function (message) {
                    // if(room == null){
                    //     room[0].id = 1;
                    //     room[0].available = 1;
                    // }
                    switch (message) {
                        case 'device1':
                            socket.emit('request-pickRoom', true, room[room.length - 1].id)
                            device[0] = false;
                            break;
                        case 'device2':
                            socket.emit('request-pickRoom', true, room[room.length - 1].id)
                            device[1] = false;
                            break;
                        default:
                            socket.emit('request-pickRoom', false, room[room.length - 1].id)
                            break;
                    }
                })
                socket.on('quick-join', function (message) {
                    // var i;
                    // for (i in room) {
                    //     console.log(i);
                    //     console.log(room);
                    //     if (room[i].available == 1) {
                    //         room[i].available = 2
                    //         console.log(i);
                    //         break;
                    //     }
                    //     if (i == room.length - 1) {
                    //         room[i].id = room.length + 1;
                    //         room[i + 1].available = 1;
                    //     }
                    // }
                    switch (message) {
                        case 'device1':
                            socket.emit('request-quickJoin', true, room[i].id)
                            device[0] = false;
                            break;
                        case 'device2':
                            socket.emit('request-quickJoin', true, room[i].id)
                            device[1] = false;
                            break;
                        default:
                            socket.emit('request-quickJoin', false, room[i].id)
                            break;
                    }
                })
                socket.emit('connection', 'device1');
                break;
            case 'player1':
                socket.on('seasion-info', function (message) {
                    MongoClient.connect(mongodbUrl, function (err, db) {
                        assert.equal(null, err);

                        var querryObj = { 'username': message.username };

                        db.collection("user").findOne(querryObj, function (err, result) {
                            assert.equal(null, err);
                            var dataObject = {};
                            if ((result) && (result.seasionKey == message.seasion)) {
                                dataObject.seasionStatus = true;
                                dataObject.userInfo = message;
                                socket.emit('queryLogin', dataObject);
                            } else {
                                dataObject.seasionKeyStatus = false;
                                socket.emit('queryLogin', dataObject);
                            }
                            db.close();

                        });
                    });
                })

                break;
        }
    })
    //Gui di lenh 'welcome' voi mot tham so la mot bien JSON. Trong bien JSON nay co mot tham so va tham so do ten la message. Kieu du lieu cua tham so l� mot chuoi.
    socket.on('device-connection', function (message) {
        switch (message.device) {
            case 'device1':
                device[0] = true;
                socket.broadcast.emit('device-info', device)
                break;
            case 'device2':
                device[1] = true;
                socket.broadcast.emit('device-info', device)
                break;
        }
        console.log(message);
    });

    //Khi lang nghe duoc lenh "connection" voi mot tham so, va chung ta dat ten tham so la message.
    //'connection' (2)

    socket.on('info_map_1', function (message, room_info) {
        map1 = message;
        console.log(map1);
        socket.broadcast.emit('recive_map_1', message)
        ready++;
        socket.broadcast.emit('turn',0,ready)
        socket.emit('turn',0,ready)
    })

    socket.on('info_map_2', function (message, room_info) {
        map2 = message;
        console.log(map2);
        socket.broadcast.emit('recive_map_2', message)
        ready++;
        socket.broadcast.emit('turn',0,ready)
        socket.emit('turn',0,ready)
    })

    socket.on('location_hit', function (message) {
        var info_hit={};
        var i
        console.log(message);
        // for (i in room) {
        //     if (room[i] == message.id) {
        //         room[i].turn =0;
        //         break;
        //     }
        // }
        // if (room[i].available == 2 && room[i]) {
            if (message.id == 'device1' && turn == 0 && ready ==2) {
                if (map2[message.j][message.i] == 1 && ready == 2) {
                    info_hit.id = 'device1';
                    info_hit.hit = true;
                    socket.broadcast.emit('hit', info_hit);
                    socket.emit('hit', info_hit);
                    console.log('1');
                    turn = 1;
                    socket.broadcast.emit('turn',1,ready)
                    socket.emit('turn',1,ready)
                } else {
                    info_hit.id = 'device1';
                    info_hit.hit = false;
                    socket.broadcast.emit('hit', info_hit);
                    socket.emit('hit', info_hit);
                    console.log('2');
                    turn = 1;
                    socket.broadcast.emit('turn',1,ready)
                    socket.emit('turn',1,ready)
                }
            } else if (message.id == 'device2' && turn == 1 && ready ==2) { 
                if (map1[message.j][message.i] == 1) {
                    info_hit.id = 'device2';
                    info_hit.hit = true;
                    socket.broadcast.emit('hit', info_hit);
                    socket.emit('hit', info_hit);
                    turn = 0;
                    console.log('3');
                    socket.broadcast.emit('turn',0,ready)
                    socket.emit('turn',0,ready)
                } else {
                    info_hit.id = 'device2';
                    info_hit.hit = false;
                    socket.broadcast.emit('hit', info_hit);
                    socket.emit('hit', info_hit);
                    turn = 0;
                    console.log('4');
                    socket.broadcast.emit('turn',0,ready)
                    socket.emit('turn',0,ready)
                }
            }
        //}
    })

    socket.on('move', function (msg) {
        switch (msg.action) {
            case 'Left':
                socket.broadcast.emit('move_ship', msg);
                break;
            case 'Right':
                socket.broadcast.emit('move_ship', msg);
                break;
            case 'Down':
                socket.broadcast.emit('move_ship', msg);
                break;
            case 'Up':
                socket.broadcast.emit('move_ship', msg);
                break;
            case 'Drop_horizontal':
                socket.broadcast.emit('move_ship', msg);
                break;
            case 'Drop_vertical':
                socket.broadcast.emit('move_ship', msg);
                break;
            case 'Hit':
                socket.broadcast.emit('move_ship', msg);
                break;
        }
    });
});

function checkLoginAccount(username, password, callback) {
    var resultObject = {};
    MongoClient.connect(mongodbUrl, function (err, db) {
        assert.equal(null, err);

        var querryObj = { 'username': username };

        db.collection("user").findOne(querryObj, function (err, result) {
            assert.equal(null, err);

            if ((result) && (result.pass == password)) {
                resultObject.accountAvailability = true;

                // Generate Seasion key
                var str = "";
                for (; str.length < 32; str += Math.random().toString(36).substr(2));
                resultObject.seasionKey = str.substr(0, 32);

                var updateValue = {
                    $set: {
                        'seasionKey': resultObject.seasionKey,
                    }
                };

                console.log(updateValue);
                db.collection("user").updateOne(querryObj, updateValue, function (err, res) {
                    assert.equal(null, err);
                    console.log("MONGO: 1 document updated");
                    db.close();
                })
                callback(resultObject);
            } else {
                resultObject.accountAvailability = false;
                callback(resultObject);
            }

            db.close();
        });
    });
}

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

function getCookie(name) {
    var nameEQ = name + "=";
    //alert(document.cookie);
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length, c.length);
    }
    return null;
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







