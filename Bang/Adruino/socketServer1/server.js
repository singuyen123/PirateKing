const PORT = 7070;									//Ð?t d?a ch? Port du?c m? ra d? t?o ra chuong trình m?ng Socket Server
 
var http = require('http') 							//#include thu vi?n http - Tìm thêm v? t? khóa http nodejs trên google n?u b?n mu?n tìm hi?u thêm. Nhung theo kinh nghi?m c?a mình, Javascript trong môi tru?ng NodeJS c?c k? r?ng l?n, khi b?n bí thì nên tìm hi?u không nên ng?i d?c và c? g?ng h?c thu?c h?t cái reference (Tài liêu tham kh?o) c?a nodejs làm gì. V? não dó!
var socketio = require('socket.io')				//#include thu vi?n socketio
 
var ip = require('ip');
var app = http.createServer();					//#Kh?i t?o m?t chuong trình m?ng (app)
var io = socketio(app);								//#Ph?i kh?i t?o io sau khi t?o app!
app.listen(PORT);										// Cho socket server (chuong trình m?ng) l?ng nghe ? port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
 
//gi?i nén chu?i JSON thành các OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}
 
//G?i d? li?u thông qua 
function sendTime() {
	
	//Ðây là m?t chu?i JSON
	var json = {
		khanh_dep_trai: "khanh dep trai", 	//ki?u chu?i
        ESP8266: 12,									//s? nguyên
		soPi: 3.14,										//s? th?c
		time: new Date()							//Ð?i tu?ng Th?i gian
    }
    io.sockets.emit('atime', json);
}
 
//Khi có m?t k?t n?i du?c t?o gi?a Socket Client và Socket Server
io.on('connection', function(socket) {	//'connection' (1) này khác gì v?i 'connection' (2)
	//hàm console.log gi?ng nhu hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là dã có m?t Socket Client k?t n?i thành công.
	
	//G?i di l?nh 'welcome' v?i m?t tham s? là m?t bi?n JSON. Trong bi?n JSON này có m?t tham s? và tham s? dó tên là message. Ki?u d? li?u c?a tham s? là m?t chu?i.
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });
	
	//Khi l?ng nghe du?c l?nh "connection" v?i m?t tham s?, và chúng ta d?t tên tham s? là message. Mình thích gì thì mình d?t thôi.
	//'connection' (2)
    socket.on('connection', function(message) {
        console.log(message);
    });
	
	//khi l?ng nghe du?c l?nh "atime" v?i m?t tham s?, và chúng ta d?t tên tham s? dó là data. Mình thích thì mình d?t thôi
    socket.on('atime', function(data) {
        sendTime();
        console.log(data);
    });
	
	socket.on('arduino', function (data) {
	  io.sockets.emit('arduino', { message: 'R0' });
      console.log(data);
    });
});