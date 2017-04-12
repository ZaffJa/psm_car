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
import { GoogleMapsPage } from '../pages/google-maps/google-maps';


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

    }>;

    constructor(public platform: Platform, private storage: Storage, private authService: AuthService) {

        this.user = this.storage.get('user').then(res => {
            if (res != null) {
                this.rootPage = GoogleMapsPage;

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
            title: 'REQUEST DELIVERY',
            component: GiveCarPage,
            icon: 'list-box'
        },
        {
            title: 'MY HISTORY',
            component: HistoryPage,
            icon: 'book'
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
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
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