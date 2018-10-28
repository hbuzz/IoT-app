import { Injectable, } from '@angular/core';
import {Events} from 'ionic-angular';


declare var Paho : any;

/*
  Generated class for the DataFeedProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataFeedProvider {

  public mqttStatus: string = 'Disconnected';
  private mqttClient: any = null;
  public message: any = '';
  private topic: string = 'swen325/a3';
  private clientId: string = 'buzz' //change this

  //battery percentage
  public bPDining: any;
  public bPKitchen : any;
  public bPLiving: any;
  public bPBedroom: any;
  public bPToilet: any;

  //counts for home screen graph
  public kitchenCount: number = 0;
  public livingCount: number = 0;
  public bedroomCount: number = 0;
  public diningCount: number = 0;
  public toiletCount: number = 0;

  //timer
  public timer: number = 0;
  public minutes: number = 0;
  public seconds: any;

  //last location for home screen
  public location: any  = 'No one is home';

  constructor(public event: Events) {
    this.setTimer();
  }


  public connect = () => {
  	this.mqttStatus = 'Connecting...';
  	//this.mqttClient = new Paho.MQTT.Client('m10.c,loudmqtt.com', 31796, '/mqtt', this.clientId);
  	this.mqttClient = new Paho.MQTT.Client('barretts.ecs.vuw.ac.nz', 8883  , '/mqtt', this.clientId);
 	
	// set callback handlers
	this.mqttClient.onConnectionLost = this.onConnectionLost;
	this.mqttClient.onMessageArrived = this.onMessageArrived;

	// connect the client
	console.log('Connecting to mqtt via websocket');
	//this.mqttClient.connect({timeout:10, userName:'ptweqash', password:'ncU6vlGPp1mN', useSSL:true, onSuccess:this.onConnect, onFailure:this.onFailure});
  this.mqttClient.connect({timeout:10, useSSL:false, onSuccess:this.onConnect, onFailure:this.onFailure});
  }
 
  public onConnect = () => {
    console.log('Connected');
  	this.mqttStatus = 'Connected';

  	// subscribe
  	this.mqttClient.subscribe(this.topic);
  }

  public onFailure = (responseObject) => {
  	console.log('Failed to connect');
    this.mqttStatus = 'Failed to connect';
  }

  public onConnectionLost = (responseObject) => {
   	if (responseObject.errorCode !== 0) {
   		this.mqttStatus = 'Disconnected';
    } 	
  }

  public onMessageArrived = (message) => {
    console.log('Received message ');
    this.message = message.payloadString;
    this.messPLT();
    console.log(this.message);
    
  }
  
  public disconnect () {
  	if(this.mqttStatus == 'Connected') {
  		this.mqttStatus = 'Disconnecting...';
  		this.mqttClient.disconnect();
		  this.mqttStatus = 'Disconnected';
  	}
  }


  //prolong activity
  setTimer(){
    setInterval(function(){
      this.timer++;
      this.minutes = Math.floor(this.timer / 60);
      this.seconds = this.timer - this.minutes * 60;

      //throws alert after 5 minutes   300
      if(this.timer == 300){
        this.event.publish("alert",0);
        self.alert("There has been no detected in the last 5 minutes")
      } 

    }.bind(this),
    1000)

  }



//splits message up and assigns to varibles above.
messPLT(){
  var string = this.message.split(",");

  if(string[1] == 'toilet'){
    this.bPToilet = string[3];
    var movement = string[2]
    if(movement == '1'){
      this.location = "Toilet";
        this.toiletCount++;
        this.timer = -1;
        this.event.publish("update",0);
        return;
    }
  }

  else if (string[1] == 'living'){
    this.bPLiving = string[3];
    var movement = string[2]
    if(movement == '1'){
      this.location = "Living";
        this.livingCount++;
        this.timer = -1;
        this.event.publish("update",0);

        return;
    }
  } 
  
  else if (string[1] == 'dining'){
    this.bPDining = string[3];
    var movement = string[2];
    if(movement == '1'){
      this.location = "Dining";
        this.diningCount++;
        this.timer = -1;
        this.event.publish("update",0);
        return;
    }
  }

  else if (string[1] == 'bedroom'){
    this.bPBedroom = string[3];
    var movement = string[2]
    if(movement == '1'){
      this.location = "Bedroom";
        this.bedroomCount++;
        this.timer = -1;
        this.event.publish("update",0);
        return;
    }
  }

  else if (string[1] == 'kitchen'){
    this.bPKitchen  = string[3];
    var movement = string[2]
    if(movement == '1'){
      this.location = "Kitchen";
        this.kitchenCount++;
        this.timer = -1;
        this.event.publish("update",0);
        return;
    }
  }
}
}