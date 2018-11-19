var socket = io()
var userInfo = {}
socket.on('connect', () => {
    socket.emit('type', 'pickroom');
    var username = getCookie('username');
    var seasionKey = getCookie('seasion');
    socket.emit('seasion-info', {
        'username': username,
        'seasion': seasionKey
    });
    socket.on('queryLogin', function (data) {
        if (data.seasionStatus) {
            userInfo = data.userInfo;
        } else {

            window.location.href = window.location.protocol + '//' + window.location.host;
        }
    })

    socket.on('connection', function (message) {
        switch (message) {
            case 'device1':
                document.getElementById("device1").disabled = false;
                break;
            case 'device2':
                document.getElementById("device2").disabled = false;
                break;
            case 'device3':
                document.getElementById("device3").disabled = false;
                break;
        }

    });
})
function createRoom() {
    document.cookie = 'device=' + getDevice() + ';';
    window.location.href = window.location.protocol + '//' + window.location.host + '/public/html/index.html';
}
function quickJoin() {
    document.cookie = 'device=' + getDevice() + ';';
    window.location.href = window.location.protocol + '//' + window.location.host + '/public/html/index.html';
}

function getDevice() {
    var device = document.forms[0];
    var txt = "";
    var i;
    for (i = 0; i < device.length; i++) {
        if (device[i].checked) {
            txt = txt + device[i].value;
        }
    }
    return txt;
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