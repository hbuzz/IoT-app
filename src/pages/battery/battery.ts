import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Events} from 'ionic-angular';

import { DataFeedProvider } from "../../providers/data-feed/data-feed";

import { Chart } from 'chart.js';
import { SeniorPage } from '../senior/senior';


/**
 * Generated class for the BatteryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-battery',
  templateUrl: 'battery.html',
})
export class BatteryPage {

  
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.ionViewDidLoad();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
 
  
  constructor(public navCtrl: NavController, public datafeedService: DataFeedProvider, public event:Events) {
   this.datafeedService = datafeedService;
   this.event.subscribe("alert",()=>{this.a()});

  }

  ionViewDidLoad() {

  }

  a(){
    self.alert("Person did not move for 5 minutes");
    this.navCtrl.push(SeniorPage);
    }

  }







