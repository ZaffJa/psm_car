import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { Login } from '../pages/login/login';
import { GetCarPage } from '../pages/get-car/get-car';
import { GiveCarPage } from '../pages/give-car/give-car';
import { GetRidePage } from '../pages/get-ride/get-ride';
import { GiveRidePage } from '../pages/give-ride/give-ride';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { HistoryPage } from '../pages/history/history';
import {RegisterPage} from "../pages/register/register";


import {AuthService} from '../providers/auth-service';

@Component({
    templateUrl: 'app.html',
    styles: [`
    img { display: block; }`]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    user: any;

    pages: Array < {
        title: string,
        component: any,
        icon: string,

    } > ;

    constructor(public platform: Platform, private storage: Storage, private authService: AuthService) {

        this.storage.get('user').then(user => {

            if (user != null) {
                this.rootPage = GiveCarPage;
            } else {
                this.rootPage = Login;
            }

        });

        this.initializeApp();
    }

    initializeApp() {
        this.storage.get('user').then(user => {
            this.user = user;
            if (this.user != null) {
                console.log(this.user);
                if (this.user.role_id == 3) {
                    this.pages = [{
                            title: 'DASHBOARD',
                            component: DashboardPage,
                            icon: 'home'
                        },
                        {
                            title: 'GET RIDE',
                            component: GetRidePage,
                            icon: 'paw'
                        },
                        {
                            title: 'GET CAR',
                            component: GetCarPage,
                            icon: 'car'
                        },
                        {
                            title: 'GIVE CAR',
                            component: GiveCarPage,
                            icon: 'car'
                        },
                        {
                            title: 'GIVE RIDE',
                            component: GiveRidePage,
                            icon: 'car'
                        },
                        {
                            title: 'HISTORY',
                            component: HistoryPage,
                            icon: 'clock'
                        },

                    ];
                } else if (this.user.role_id == 2) {
                    this.pages = [{
                            title: 'DASHBOARD',
                            component: DashboardPage,
                            icon: 'home'
                        },
                        {
                            title: 'GET RIDE',
                            component: GetRidePage,
                            icon: 'paw'
                        },
                        {
                            title: 'GET CAR',
                            component: GetCarPage,
                            icon: 'car'
                        },
                        {
                            title: 'HISTORY',
                            component: HistoryPage,
                            icon: 'clock'
                        },
                    ];
                }
            }
        });

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


    logout() {
        this.authService.logout();

        this.nav.setRoot(Login, {
            "message": "Thank you for using our system."
        })
    }
}
