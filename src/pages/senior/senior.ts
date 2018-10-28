import { Component, ViewChild, } from '@angular/core';
import { IonicPage, NavController,  } from 'ionic-angular';
import { DataFeedProvider } from "../../providers/data-feed/data-feed";
import {Events} from 'ionic-angular';

import { Chart } from 'chart.js';

/**
 * Generated class for the SeniorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-senior',
  templateUrl: 'senior.html',
})
export class SeniorPage {

  @ViewChild('barCanvas') barCanvas;


  barChart: any;


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    if (this.datafeedService.mqttStatus ==  'Discounted' || this.datafeedService.mqttStatus ==  'Failed to connect') {
        this.datafeedService.connect();
    }   

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  constructor(public navCtrl: NavController, public datafeedService: DataFeedProvider, public event:Events ) {
    this.datafeedService.connect();
    this.event.subscribe("update",()=>{this.refreshGraph()});
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SeniorPage');
      this.refreshGraph();
    }
      
    
  
  refreshGraph(){

    this.barChart = new Chart(this.barCanvas.nativeElement, {
 
      type: 'bar',
      data: {
          labels: ["Bedroom", "Toilet", "Dinning", "Living", "Kitchen"],
          datasets: [{
              label: '# of movements',
              data: [ 
                this.datafeedService.bedroomCount, 
                this.datafeedService.toiletCount,
                this.datafeedService.diningCount, 
                this.datafeedService.livingCount,
                this.datafeedService.kitchenCount
              ],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 0.5
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }

  });
  }

  }


