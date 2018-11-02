#include <ESP8266WiFi.h>

const char* ssid      =  "TRUNG TAM KTX";
const char* password  =  "Nhu mat khau cu.";
void setup() {
  // put your setup code here, to run once:
Serial.begin(115200);
delay(10);
Serial.print("Connecting to ");
//in ra ten mang wifi se ket noi
Serial.println(ssid);
//Thiet lap esp o che o station va ket noi den mang wifi 
WiFi.begin(ssid,password);
//doan code in ra dau . neu esp chua ket noi duoc
while(WiFi.status() != WL_CONNECTED){
  delay(500);
  Serial.print(".");
}
//In ra dong wifi connected vao dia chi ip cua esp8266
Serial.println("");
Serial.println("Wifi connected");
Serial.println("IP address: ");
Serial.println(WiFi.localIP());
}

void loop() {
  // put your main code here, to run repeatedly:

}
