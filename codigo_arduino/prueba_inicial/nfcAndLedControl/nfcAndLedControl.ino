/* 
Script para controlar sensores de ambiente del aula en conjunto con chip NFC para control de asistencia.
Creado por:
Nair Cabrera
Maximiliano Castro
Cristian Cereseto
Fernando Di Pietro
*/

// Libraries
//aREST Libraries
#include <SPI.h>
#include <aREST.h>
#include <avr/wdt.h>
//NFC Libraries
#include <PN532.h>
#include <Time.h>

// Create aREST instance
aREST rest = aREST();
const int PN532_CS = 10;
PN532 nfc(PN532_CS);
#define  NFC_DEMO_DEBUG 1

// Variables to be exposed to the API
int modoAuto;
int tagId;
boolean tagUnico = true;

int pinLuz1;
int pinLuz2;
int pinCAL;
int pinAA;

int pinLDR;
int valorLDR;
int analogInPin;
int sensorValue;        // value read from the pot

void setup(void)
{  
  #ifdef NFC_DEMO_DEBUG
  // Start Serial
  Serial.begin(115200);
  Serial.println("Aplicación iniciada!");
  
  // Init variables and expose them to REST API
  modoAuto = 0;
  tagId = 0;
  int pinLuz1 = 5;
  int pinLuz2 = 6;
  int pinCAL = 7;
  int pinAA = 8;
  
  analogInPin = A0;
  sensorValue = 0;



  tagId = 0;
  #endif
  rest.variable("tagId",&tagId);
  rest.variable("modoAuto", &modoAuto);
  
//  uint32_t versiondata = nfc.getFirmwareVersion();
//
//  if (! versiondata) {  
//      Serial.print("Didn't find PN53x board");
//      while (1); // halt  
//    }

  // Function to be exposed
  rest.function("cambiarModo",cambiarModo);
  
  // Give name and ID to device
  rest.set_id("2");
  rest.set_name("Arduino");

  // Start watchdog
  wdt_enable(WDTO_4S);
  nfc.begin();
  nfc.SAMConfig();
}

void loop() {
  uint32_t id;

  // Handle REST calls  
  if(tagUnico) {
  // look for MiFare type cards
    id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A);

    if (id != 0) {
      //guardar id en variable y asignar a rest.variable
        tagId = id;
        tagUnico = false;
        Serial.print("Read card #");
        Serial.println(tagId);
    }
  } else {
      id = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A);
      
      if (id == 0) {
        tagUnico = true;
      } 
  }
  delay(100);

  if (modoAuto) {
    //Guardamos el valor leido en una variable
    sensorValue = analogRead(analogInPin);
    
    Serial.println(sensorValue);

    if (sensorValue > 750) {
       digitalWrite(pinLuz1,HIGH);
       digitalWrite(pinLuz2,HIGH);
    } else {
      if (sensorValue <= 750 && sensorValue > 450) {
       digitalWrite(pinLuz1, HIGH);   
      } else {
       digitalWrite(pinLuz1,LOW);
       digitalWrite(pinLuz2,LOW);
      }  
    }
    
    delay(50);//wait
    rest.handle(Serial);
  } else {
    rest.handle(Serial);
  }
  wdt_reset();
}

// Custom function accessible by the API
int cambiarModo(String command) {
  
// Get state from command
  int state = command.toInt();
  Serial.print("state "+state);
  modoAuto = state;
  Serial.print("modoAuto "+modoAuto);
  return 1;
}
