var socket = io()
var userInfo = {}
socket.on('connect', () => {
    socket.emit('type', 'select_device');
    socket.on('device-info', function (message) {
        console.log(message)
        if (message[0]){
            document.getElementById("device1").disabled = false;
            document.getElementById("device1").checked = false;
        }
        else{ 
            document.getElementById("device1").disabled = true;
            document.getElementById("device1").checked = false;
        }
        if (message[1]){
            document.getElementById("device2").disabled = false;
            document.getElementById("device1").checked = false;
        }else {
            document.getElementById("device2").disabled = true;
            document.getElementById("device1").checked = false;
        }
    })
    var username = getCookie('username');
    var seasionKey = getCookie('seasion');
    socket.emit('seasion-info', {
        'username': username,
        'seasion': seasionKey
    });
    /*socket.on('queryLogin', function (data) {
        if (data.seasionStatus) {
            userInfo = data.userInfo;
        } else {
            window.location.href = window.location.protocol + '//' + window.location.host;
        }
    })*/
    socket.on('request-pickRoom',function(message,roomId){
        var txt = document.getElementById('message')
        if(message)
        window.location.href = window.location.protocol + '//' + window.location.host + '/public/html/room.html';
        else {
            txt.textContent = "Please choice device";
            txt.style.visibility = "visible";
        }
    })
    

})
function createRoom() {
    document.cookie = 'device=' + getDevice() + ';';
    socket.emit('select', getDevice());
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