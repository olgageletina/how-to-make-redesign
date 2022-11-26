#include <TimerFreeTone.h>
#include <SoftwareSerial.h>

const int Rx = 4;
const int Tx = 3;
SoftwareSerial mySerial(Rx, Tx);
int incomingByte = 0;

#define TONE_PIN 1



void setup() {
  pinMode(Rx, INPUT);
  pinMode(Tx, OUTPUT);
  mySerial.begin(9600); 
}

void loop() {
  //if (mySerial.available()) {
    incomingByte = mySerial.read();
    //Serial.println(incomingByte);
    //mySerial.write(incomingByte); 
    //analogWrite(TONE_PIN, incomingByte);
    TimerFreeTone(TONE_PIN, incomingByte*10, 250); // Play thisNote for duration.incomingByte * 5
    //delay(100); // Short delay between notes.
  //} 
 }


