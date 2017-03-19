import { Component } from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Providers
import {TransactionProvider} from '../../providers/transaction-provider';


@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    private dashboard:any;
    private user:any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private toastCtrl: ToastController,
        public storage: Storage,
        public transactionProvider: TransactionProvider) {
        if (navParams.data.message != null) {

            this.toastCtrl.create({
                message: navParams.data.message,
                duration: 1500,
                position: 'bottom'
            }).present();
        }

        this.storage.get('user').then(user => {
            this.user = user;
            this.transactionProvider.getDashboard(user.id).subscribe(res => {
                this.dashboard = res;
                console.log(res);
            });
        });

    }
}
