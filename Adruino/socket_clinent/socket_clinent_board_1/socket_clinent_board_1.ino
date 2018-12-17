#include <ArduinoJson.h>
#include <SocketIOClient.h>
#include <ESP8266WiFi.h>


 
SocketIOClient client;
//const char* ssid = "UIT_Guest";          //name Wifi ma Socket server connecting
//const char* password = "1denmuoi1";  //Pass wifi 
const char* ssid      =  "1";
const char* password  =  "12345678";

String InString= "";
char host[] = "192.168.43.226";  //address IP service
int port = 3000;                  //port server create
String device = "device1";

//const char* ssid      =  "TRUNG TAM KTX";
//const char* password  =  "Nhu mat khau cu.";

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
    pinMode(13, OUTPUT);  //led chân 12
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
        client.send("device-connection","{\"device\":\"device1\"}");
        
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
               client.send("move", "{\"id\":\"1\",\"action\":\"Right\"}");
               InString="";
           }
        
          if(InString[0]=='a' )
          {
             client.send("move", "{\"id\":\"1\",\"action\":\"Left\"}");
             InString="";
             
          }
      
          if(InString[0]=='w' )
          {
             client.send("move", "{\"id\":\"1\",\"action\":\"Down\"}");
             InString="";
             
          }
          if(InString[0]=='x' )
          {
             client.send("move", "{\"id\":\"1\",\"action\":\"Up\"}");
             InString="";
             
          }
          if(InString[0]=='s' )
          {
             client.send("move", "{\"id\":\"1\",\"action\":\"Hit\"}");
             InString="";
             
          }
          if(InString[0]=='q' )
          {
             client.send("move", "{\"id\":\"1\",\"action\":\"Drop_horizontal\"}");
             InString="";
             
          }
          if(InString[0]=='z' )
          {
             client.send("move", "{\"id\":\"1\",\"action\":\"Drop_vertical\"}");
             InString="";
             
          }

         InString="";


      }
       if (!client.connected()) {
        client.reconnect(host, port);
      }
  }




    //Khi bắt được bất kỳ sự kiện nào thì chúng ta có hai tham số:
    //  +RID: Tên sự kiện
    //  +RFull: Danh sách tham số được nén thành chuỗi JSON!
    if (client.monitor()) {

        Serial.println(RID);
        if(RID == "hit")
        {
           StaticJsonBuffer<300> JSONBuffer;   //Memory pool
           JsonObject& parsed = JSONBuffer.parseObject(Rfull); //Parse message
           
           if (!parsed.success()) {   //Check for errors in parsing
            Serial.println("Parsing failed");
            delay(5000);
            return;
           }
           const char * id = parsed["id"]; //Get id type value
           const char * hit = parsed["hit"]; 
          if( id == "device1" )
          {
            if(hit == "true")
            {
              digitalWrite(13, HIGH);
              delay(300);
              digitalWrite(13, LOW);
            }
            else
            {
              digitalWrite(13, HIGH);
              delay(300);
              digitalWrite(13, LOW);
              delay(300);
              digitalWrite(13, HIGH);
              delay(300);
              digitalWrite(13, LOW);
            }
          }
        }

        if(RID == "win")
        {
           StaticJsonBuffer<300> JSONBuffer;   //Memory pool
           JsonObject& parsed = JSONBuffer.parseObject(Rfull); //Parse message
           
           if (!parsed.success()) {   //Check for errors in parsing
            Serial.println("Parsing failed");
            delay(5000);
            return;
           }
           const char * id = parsed["id"]; //Get id type value
          if(id == "device1")
          {
          digitalWrite(13, HIGH);
          delay(1000);
          digitalWrite(13, LOW);
          delay(500);
          digitalWrite(13, HIGH);
          delay(1000);
          digitalWrite(13, LOW);
        }

     }

//    //Kết nối lại!
//    if (!client.connected()) {
//      client.reconnect(host, port);
//    }
}
}
