/* 
  This a simple example of the aREST Library for Arduino (Uno/Mega/Due/Teensy)
  using the Serial port. See the README file for more details.
 
  Written in 2014 by Marco Schwartz under a GPL license. 
*/

// Libraries
#include <PN532.h>
#include <SPI.h>
#include <aREST.h>
#include <avr/wdt.h>
#include <Time.h>

// Create aREST instance
aREST rest = aREST();
const int PN532_CS = 10;
PN532 nfc(PN532_CS);

// Variables to be exposed to the API
int tagId;
boolean tagUnico = true;

void setup(void)
{  
  // Start Serial
  Serial.begin(115200);
  
  // Init variables and expose them to REST API
  tagId = 0;

  nfc.begin();
  rest.variable("tagId",&tagId);
  
    uint32_t versiondata = nfc.getFirmwareVersion();

  if (! versiondata) {  
      Serial.print("Didn't find PN53x board");
      while (1); // halt  
    }

  // Function to be exposed
  // rest.function("led",ledControl);
  
  // Give name and ID to device
  rest.set_id("2");
  rest.set_name("serial");

  // Start watchdog
  wdt_enable(WDTO_4S);
  
  nfc.SAMConfig();
}

void loop() {  
  uint32_t id;
  // Handle REST calls
  rest.handle(Serial);  
  wdt_reset();
  
  if(tagUnico) {
    // look for MiFare type cards
    id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A);
      if (id != 0) {
	//guardar id en variable y asignar a rest.variable
        tagId = id;
        tagUnico = false;
      }
    } else {
    id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A);
    if (id == 0) {      
      tagUnico = true; 
    } 
  }
}

// Custom function accessible by the API
//int ledControl(String command) {
  
// Get state from command
//  int state = command.toInt();
  
// digitalWrite(6,state);
//  return 1;
//}
