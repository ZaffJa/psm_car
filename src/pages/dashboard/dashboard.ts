import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Providers
import { TransactionProvider } from '../../providers/transaction-provider';


@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html',
})
export class DashboardPage {

    private dashboard: any;
    private user: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private toastCtrl: ToastController,
        public storage: Storage,
        public transactionProvider: TransactionProvider,
        public loadingCtrl: LoadingController) {


        // let loader = this.loadingCtrl.create({
        //     content: "Please wait...",
        //     duration: 3000
        // });
        // loader.present();


    }

    ionViewDidLoad() {

        this.storage.get('user').then(user => {

            if (this.navParams.data.message != null) {

                this.toastCtrl.create({
                    message: this.navParams.data.message,
                    duration: 1500,
                    position: 'bottom'
                }).present();
            }

            this.user = user;
            if (user != null) {
                this.transactionProvider.getDashboard(user.id).subscribe(res => {
                    this.dashboard = res;
                    // loader.dismiss();
                });
            }

        });
    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        this.ionViewDidLoad();

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }
}
