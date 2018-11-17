var ws = new WebSocket('ws://128.199.225.158:80');
ws.onopen = function () {
    //console.log('websocket is connected ...')

    // sending a send event to websocket server
    ws.send('{"stt":"connected"}')
}

// event emmited when receiving message 
ws.onmessage = function (ev) {
    console.log(ev);
}

function checkDevice() {
    var device = document.forms[0];
    var txt = "";
    var i;
    for (i = 0; i < coffee.length; i++) {
        if (device[i].checked) {
            txt = txt + device[i].value + " ";
            var temp1 = '{"stt":"createRoom","device":"'
            var temp2 = '"}'
            ws.send(temp1+txt+temp2);
        }
    }
}