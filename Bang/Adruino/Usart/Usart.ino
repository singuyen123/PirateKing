#include "string.h"
#include <ESP8266WiFi.h>

String InString= "";
bool stringComplete = false;  // whether the string is complete

void setup() {
  // initialize serial:
  Serial.begin(115200);
  Serial.println("Hello word");
  // reserve 200 bytes for the inputString:
  InString.reserve(200);
}

void loop() {
  // print the string when a newline arrives:
  //if(Serial.isRxEnabled()){
      while(Serial.available()){
        char InChar=Serial.read();
        InString+=InChar;
        if(InChar == '.') 
        {
            Serial.print(InString);
            Serial.print("\r\n");
            InString="";
            return;
        }
  }
//}
}

void ReceiveString(uint8_t leng, char delim) {
  InString="";
  while (InString.length() < leng) { //until reach enough length or buff[lastest byte]==delim
    if (Serial.isRxEnabled()){
      if(Serial.available()){
        char InChar=Serial.read();
        if(InChar==delim) return;
        InString+=InChar;
      }
    }
  }
}
