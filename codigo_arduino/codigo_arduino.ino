#include <PN532.h>
#include <SPI.h>
#include <aREST.h>
#include <avr/wdt.h>

#define SCK 13
#define MOSI 11
#define SS 10
#define MISO 12

// Create aREST instance
aREST rest = aREST();

// Variables to be exposed to the API
int temperature;
int humidity;

PN532 nfc(SCK, MISO, MOSI, SS);

void setup(void) {
    Serial.begin(115200);
    Serial.println("Hello!");

    nfc.begin();

    uint32_t versiondata = nfc.getFirmwareVersion();
    if (! versiondata) {
        Serial.print("Didn't find PN53x board");
        while (1); // halt
    }
    // Got ok data, print it out!
    Serial.print("Found chip PN5"); Serial.println((versiondata>>24) & 0xFF, HEX);
    Serial.print("Firmware ver. "); Serial.print((versiondata>>16) & 0xFF, DEC);
    Serial.print('.'); Serial.println((versiondata>>8) & 0xFF, DEC);
    Serial.print("Supports "); Serial.println(versiondata & 0xFF, HEX);

    // configure board to read RFID tags and cards
    nfc.SAMConfig();
  // Init variables and expose them to REST API
  temperature = 24;
  humidity = 40;
  rest.variable("temperature",&temperature);
  rest.variable("humidity",&humidity);

  // Function to be exposed
  rest.function("led",ledControl);
  
  // Give name and ID to device
  rest.set_id("2");
  rest.set_name("serial");

  // Start watchdog
  wdt_enable(WDTO_4S);

}


void loop(void) {
    uint32_t id;
    // look for MiFare type cards
    id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A);

    if (id != 0) {
        Serial.print("Read card #"); Serial.println(id);
    }
// Handle REST calls
  rest.handle(Serial);  
  wdt_reset();
}

// Custom function accessible by the API
int ledControl(String command) {
  
  // Get state from command
  int state = command.toInt();
  
  digitalWrite(6,state);
  return 1;
}


