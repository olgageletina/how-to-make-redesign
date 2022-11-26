
#include <TimerFreeTone.h>
#define TONE_PIN 1

int incomingByte = 0;

//int rxPin = 0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600); 
}

void loop() {
  // put your main code here, to run repeatedly:

  if (Serial.available() > 0) {

  incomingByte = Serial.read(); // read the incoming byte:
  Serial.print(" I received:");
  Serial.println(incomingByte);

  //analogWrite( wavePin, incomingByte);
  //delay( 100 );
  }
}
