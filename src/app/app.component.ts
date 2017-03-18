import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';


import { Login } from '../pages/login/login';
import { GetCarPage } from '../pages/get-car/get-car';
import { GiveCarPage } from '../pages/give-car/give-car';
import { GetRidePage } from '../pages/get-ride/get-ride';
import { GiveRidePage } from '../pages/give-ride/give-ride';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RegisterPage } from '../pages/register/register';





@Component({
  templateUrl: 'app.html',
  styles: [`
    img { display: block; }`
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = GetRidePage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'DASHBOARD', component: DashboardPage, icon: 'home' },
      { title: 'GET RIDE', component: GetRidePage, icon: 'paw' },
      { title: 'GET CAR', component: GetCarPage, icon: 'car' },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
}
