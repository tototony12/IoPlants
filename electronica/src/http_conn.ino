#include <SoftwareSerial.h>
#include <String.h>
#include <Servo.h>


SoftwareSerial Sim900Serial(2, 3);//Configarión de los pines serial por software //Setup the serial digital pins for the sim800l
Servo myservo;  // create servo object to control a servo


void setup()
{
Sim900Serial.begin(9600);//Arduino se comunica con el SIM900 a una velocidad de 19200bps   //Start the serial for the sim800l with 9600bps
Serial.begin(9600);//Start the serial  with 9600 bps
myservo.attach(9);  // attaches the servo on pin 9 to the servo object
delay(20000);
}

void loop(){  
  

start_GPRS_conn();
check_status_servo();


}


String  read_humidity(){

  // Read the input on analog pin 0:
  int sensorValue = analogRead(A0);
  // Convert the analog reading (which goes from 0 - 1023) to a voltage (0 - 5V):
  int per_humidity = map(sensorValue,0,1023,100,0);
  // Print out the value you read:
  return String(per_humidity);
  
}

 String  read_lux(){

    double Vout=analogRead(A1)*0.0048828125;
    int lux=(2500/Vout-500)/10;
    return String(lux);
    
}

 
void start_GPRS_conn(){
  
Sim900Serial.println("AT+CIPSTATUS");//Ask for the current state connection
delay(1000);
Sim900Serial.println("AT+CIPMUX=0"); //Set the device with a unique IP connection
delay(1000);
Sim900Serial.println("AT+CSTT=\"gprs.movistar.com.ar\",\"wap\",\"wap\"");//"gprs.movistar.com.ar","wap","wap"->Movistar Arg. //Setup the APN 
delay(1000);
Sim900Serial.println("AT+CIICR"); //Establish a GPRS connection
delay(1000);
Sim900Serial.println("AT+CIFSR");//Get the local IP address
delay(1000);
Sim900Serial.println("AT+CIPSPRT=0");// Set a indicator to send the data
delay(1000);
Sim900Serial.println("AT+CIPSTART=\"TCP\",\"api.thingspeak.com\",\"80\""); //Set the url and the port with the connection that we want to make
delay(1000);
Sim900Serial.println("AT+CIPSEND");//Send data through a UDP connection
delay(1000);
//Concatenate the read value to the API GET
String data="GET https://api.thingspeak.com/update?api_key=CKRSUZVI72EZRI14&field2=0" + read_humidity();
Sim900Serial.println(data);//Send the data to the remote server
delay(1000);
data="GET https://api.thingspeak.com/update?api_key=CKRSUZVI72EZRI14&field1=0" + read_lux();
Sim900Serial.println(data);//Send the data to the remote server
delay(1000);
Sim900Serial.println((char)26);
delay(1000);
Sim900Serial.println();
Sim900Serial.println("AT+CIPSHUT");//Close the GPRS connection 
delay(1000);

} 



void check_status_servo(){

  int val_humidity = read_humidity().toInt();
 
  if(val_humidity>=0&&val_humidity<=70){
    myservo.write(90);           
  }
  else{
     myservo.write(0);           
  }
  
}
