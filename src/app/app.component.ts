import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

//Pages
import { Login } from '../pages/login/login';
import { GetCarPage } from '../pages/get-car/get-car';
import { GiveCarPage } from '../pages/give-car/give-car';
import { GetRidePage } from '../pages/get-ride/get-ride';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { HistoryPage } from '../pages/history/history';
import { RegisterPage } from '../pages/register/register';
import { SettingPage } from '../pages/setting/setting';
import { GoogleMapsPage } from '../pages/google-maps/google-maps';
import { HistoryTabPage } from '../pages/history-tab/history-tab';


// Providers
import { AuthService } from '../providers/auth-service';

@Component({
    templateUrl: 'app.html',
    styles: [`
    img { display: block; }`]
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    user: any;

    pages: Array<{
        title: string,
        component: any,
        icon: string,
        index?: number

    }>;

    constructor(public platform: Platform, private storage: Storage, private authService: AuthService) {

        this.storage.get('user').then(res => {
            if (res != null) {
                this.user = res;

                this.rootPage = DashboardPage;

            } else {
                this.rootPage = Login;
            }
        });

        this.pages = [{
            title: 'REQUEST RIDE',
            component: GetRidePage,
            icon: 'subway'
        },
        {
            title: 'REQUEST CAR',
            component: GetCarPage,
            icon: 'car'
        },
        {
            title: 'MY HISTORY',
            component: HistoryTabPage,
            icon: 'book'
        },
        {
            title: 'PROFILE',
            component: SettingPage,
            icon: 'contact'
        }];
        this.initializeApp();
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
        // If page contain index which is for tab navigation in HistoryTabPage
        if (page.index) {
            this.nav.push(page.component, { index: page.index });
        }

        this.nav.push(page.component);
    }

    openAcceptRequest() {
        this.nav.push(GiveCarPage);
    }



    logout() {
        this.authService.logout();

        this.nav.setRoot(Login, {
            "message": "Thank you for using our system."
        })
    }

    openHome() {
        this.nav.setRoot(DashboardPage);
    }

}