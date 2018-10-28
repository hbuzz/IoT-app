import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { BatteryPage } from "../pages/battery/battery";
import { SeniorPage } from "../pages/senior/senior";
import { TabPage } from '../pages/tab/tab'




import { DataFeedProvider } from '../providers/data-feed/data-feed';

@NgModule({
  declarations: [
    MyApp,
    BatteryPage,
    SeniorPage,
    TabPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BatteryPage,
    SeniorPage,
    TabPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataFeedProvider
  ]
})
export class AppModule {}
