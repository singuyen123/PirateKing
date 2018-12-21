var socket = io()
var room;

socket.emit('type', 'room');
socket.on('info_room',function(msg){
    room = msg
    for (var i in msg){

        document.getElementById(i).innerHTML="Room"+i+" ("+msg[i]+"/2)";
    }
})
function joinRoom() {
    var e = document.getElementById("ddlViewBy");
    document.cookie = 'room=' + e.options[e.selectedIndex].value + ';';
    socket.emit('select_room', e.options[e.selectedIndex].value);
    console.log(e.options[e.selectedIndex].value);
}

socket.on('respone_room',function(message){
    var txt = document.getElementById('message')
    if(message)
    window.location.href = window.location.protocol + '//' + window.location.host + '/public/html/index.html';
    else {
        txt.textContent = "Room full";
        txt.style.visibility = "visible";
    }
})

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