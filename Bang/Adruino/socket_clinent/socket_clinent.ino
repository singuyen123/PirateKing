
#include <SocketIOClient.h>
#include <ESP8266WiFi.h>

 
SocketIOClient client;
//const char* ssid = "UIT_Guest";          //name Wifi ma Socket server connecting
//const char* password = "1denmuoi1";  //Pass wifi 
//const char* ssid      =  "TRUNG TAM KTX";
//const char* password  =  "Nhu mat khau cu.";
const char* ssid      =  "Hacker";
const char* password  =  "55555555";


String InString= "";
char host[] = "128.199.225.158";  //address IP service
int port = 3000;                  //port server create

//từ khóa extern: dùng để #include các biến toàn cục ở một số thư viện khác. Trong thư viện SocketIOClient có hai biến toàn cục
// mà chúng ta cần quan tâm đó là
// RID: Tên hàm (tên sự kiện
// Rfull: Danh sách biến (được đóng gói lại là chuối JSON)
extern String RID;
extern String Rfull;
 
 
//Một số biến dùng cho việc tạo một task
unsigned long previousMillis = 0;
long interval = 10000;
 
void setup()
{
    //Bật baudrate ở mức 115200 để giao tiếp với máy tính qua Serial
    Serial.begin(115200);
    delay(10);
    //Việc đầu tiên cần làm là kết nối vào mạng Wifi
    Serial.print("Ket noi vao mang ");
    Serial.println(ssid);
 
    //Kết nối vào mạng Wifi
    WiFi.begin(ssid, password);
 
    //Chờ đến khi đã được kết nối
    while (WiFi.status() != WL_CONNECTED) { //Thoát ra khỏi vòng 
        delay(500);
        Serial.print('.');
    }
 
    Serial.println();
    Serial.println(F("Da ket noi WiFi"));
    Serial.println(F("Di chi IP cua ESP8266 (Socket Client ESP8266): "));
    Serial.println(WiFi.localIP());
 
    if (!client.connect(host, port)) {
        Serial.println(F("Ket noi den socket server that bai!"));
        return;
    }
 
    //Khi đã kết nối thành công
    if (client.connected()) {
        //Thì gửi sự kiện ("connection") đến Socket server ahihi.
        Serial.print("Ket noi den socket server thanh cong");
        client.send("connection", "message", "Connected !!!!");
    }
}
 
void loop()
{
      while(Serial.available()){
        char InChar=Serial.read();
        InString+=InChar;
        if(InChar == '.') 
        {
            Serial.print(InString);
            Serial.print("\r\n");
          if(InString[0]=='d' )
           {
               client.send("right", "message", InString);
               InString="";
               
           }
        
          if(InString[0]=='a' )
          {
             client.send("left", "message", InString);
             InString="";
             
          }
      
          if(InString[0]=='w' )
          {
             client.send("down", "message", InString);
             InString="";
             
          }
          if(InString[0]=='s' )
          {
             client.send("up", "message", InString);
             InString="";
             
          }
          if(InString[0]=='q' )
          {
             client.send("ok", "message", "Time please?");
             InString="";
             
          }
         InString="";
      }
  }

   // client.send("right", "message", InString);
    //tạo một task cứ sau "interval" giây thì chạy lệnh:
//    if (millis() - previousMillis > interval) {
//        //lệnh:
//        previousMillis = millis();
// 
//        //gửi sự kiện "atime" là một JSON chứa tham số message có nội dung là Time please?
//        client.send("atime", "message", "Time please?");
//    }



    //Khi bắt được bất kỳ sự kiện nào thì chúng ta có hai tham số:
    //  +RID: Tên sự kiện
    //  +RFull: Danh sách tham số được nén thành chuỗi JSON!
    if (client.monitor()) {
        Serial.println(RID);
        Serial.println(Rfull);
    }
        if (millis() - previousMillis > interval) {
        //lệnh:
        previousMillis = millis();
 
        //gửi sự kiện "atime" là một JSON chứa tham số message có nội dung là Time please?
        client.reconnect(host, port);
    }
 
    //Kết nối lại!
    if (!client.connected()) {
      client.reconnect(host, port);
    }
}
