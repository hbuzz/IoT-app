import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';



import { BatteryPage } from "../battery/battery";
import { SeniorPage } from "../senior/senior";


/**
 * Generated class for the TabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab',
  templateUrl: 'tab.html',
})
export class TabPage {

  tab1Root = SeniorPage;
  tab2Root = BatteryPage;
  constructor() {
  }


}
