#include "string.h"
#include <ESP8266WiFi.h>

String InString= "";


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
