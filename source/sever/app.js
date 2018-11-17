
const PORT = 3000;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongodbUrl = "mongodb://localhost:27017/Pirateking";
var express = require('express');
var cookieParser = require('cookie-parser');
//var path = require('path');
var app = express();
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({ port: 80 })
var username
var pass
var dirname = "/home/bang/Workspace"

////bang
var ip = require('ip');
var http = require('http') 							//#include thu vien http -
var socketio = require('socket.io')				//#include thu vien socketio
var server = http.createServer(app);
var io = socketio(server);
server.listen(PORT, function () {
    console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
})
//////
app.use(cookieParser());
app.get('/', function (req, res) {
    res.sendfile(dirname + '/PirateKing/source/html/signin.html');
});
app.get('/play', function (req, res) {
    checkIfLogedIn(req, res, function (logedInFlag) {
        if (logedInFlag) {
            res.sendfile(dirname + '/PirateKing/source/html/index.html');
        } else {
            res.redirect('signin.html');
        }
    });

});
app.get('/pickroom', function (req, res) {
    checkIfLogedIn(req, res, function (logedInFlag) {
        if (logedInFlag) {
            res.sendfile(dirname + '/PirateKing/source/html/pickroom.html');
        } else {
            res.redirect('signin.html');
        }
    });

});
//app.listen(3000, function () {
//console.log('Example app listening on port 3000!')
//})

app.post('/submit', function (req, res) {
    checkLoginAccount(username, pass, function (result) {
        if (result) {
            res.cookie('username', username, { maxAge: 360000 });
            res.redirect('/play');
        } else {
            res.sendfile(dirname + '/PirateKing/source/html/signin_wrong.html')
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

function checkIfLogedIn(req, res, callback) {
    if (req.session.loged_in_id) {
        // Go to index.html
        //res.sendFile(__dirname + "/Web_Control/pages/" + "index.html");
        callback(true);
    } else {
        var remember = req.cookies.remember;

        if (remember === 'true') {
            var identifier = req.cookies.identifier;
            var token = req.cookies.token;

            checkIdentifierToken(identifier, token, function (result, id) {
                if (result) {
                    // Generate new token
                    var identifier = generateIdentifier();
                    var token = generateToken(identifier);

                    // Write new identifier/token to cookie
                    res.cookie('identifier', identifier, options);
                    res.cookie('token', token, options);

                    // Write new identifier/token to database
                    writeIdentifierTokenToDatabase(id, identifier, token);

                    // Write id to session
                    req.session.loged_in_id = id;

                    // Respone index page
                    //res.sendFile(__dirname + "/Web_Control/pages/" + "index.html");
                    callback(true);
                } else {
                    // Go to login page
                    //res.redirect('login.html');
                    callback(false);
                }
            });
        } else {
            callback(false);
        }
    }
}



//////////////////////////////////bang
//giai nen chuoi JSON thanh cac OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
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

//Gui du lieu th�ng qua 
function moveLeft() {

    //�ay la mot chuoi JSON
    var json = {
        status: "Left", 	//kieu chuoi
        x: 0,
        y: 0
    }
    io.sockets.emit('Left', json);
}

//Gui du lieu th�ng qua 
function moveRight() {

    //�ay la mot chuoi JSON
    var json = {
        status: "Right", 	//kieu chuoi
        x: 0,
        y: 0
    }
    io.sockets.emit('Right', json);
}
//Gui du lieu th�ng qua 
function moveDown() {

    //�ay la mot chuoi JSON
    var json = {
        status: "Down", 	//kieu chuoi
        x: 0,
        y: 0
    }
    io.sockets.emit('Down', json);
}
//Gui du lieu th�ng qua 
function moveUp() {

    //�ay la mot chuoi JSON
    var json = {
        status: "Up", 	//kieu chuoi
        x: 0,
        y: 0
    }
    io.sockets.emit('Up', json);
}
//Gui du lieu th�ng qua 
function located() {

    //�ay la mot chuoi JSON
    var json = {
        status: "located", 	//kieu chuoi
    }
    io.sockets.emit('Up', json);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Khi co mot ket noi duoc tao giua Socket Client v� Socket Server
io.on('connection', function (socket) {	//'connection' (1) nay khac gi voi 'connection' (2)

    console.log("Connected"); //In ra windowm console la da co mot Socket Client ket noi thanh cong.

    //Gui di lenh 'welcome' voi mot tham so la mot bien JSON. Trong bien JSON nay co mot tham so va tham so do ten la message. Kieu du lieu cua tham so l� mot chuoi.
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });

    //Khi lang nghe duoc lenh "connection" voi mot tham so, va chung ta dat ten tham so la message.
    //'connection' (2)
    socket.on('connection', function (message) {
        console.log(message);
    });

    //khi lang nghe duoc lenh "atime" voi mot tham so, dat ten tham so do la data. 
    socket.on('atime', function (data) {
        sendTime();
        console.log(data);
    });

    //when listenned event "right"
    socket.on('right', function (data) {
        moveRight();
        console.log(data);
    });
    //when listenned event "left"
    socket.on('left', function (data) {
        moveLeft();
        console.log(data);
    });
    //when listenned event "down"
    socket.on('down', function (data) {
        moveDown();
        console.log(data);
    });
    //when listenned event "up"
    socket.on('up', function (data) {
        moveUp();
        console.log(data);
    });
    //when listenned event "ok"
    socket.on('ok', function (data) {
        located();
        console.log(data);
    });


    socket.on('arduino', function (data) {
        io.sockets.emit('arduino', { message: 'R0' });
        console.log(data);
    });
});

///////







