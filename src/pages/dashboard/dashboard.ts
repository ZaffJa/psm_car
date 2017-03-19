import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private toastCtrl: ToastController,
        public storage: Storage) {
        if (navParams.data.message != null) {

            this.toastCtrl.create({
                message: navParams.data.message,
                duration: 1500,
                position: 'bottom'
            }).present();
        }

        this.storage.get('user').then(user => console.log(user));

    }
}
