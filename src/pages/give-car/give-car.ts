import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {TransactionProvider} from '../../providers/transaction-provider';

import {Observable} from 'rxjs/Rx';


@Component({
    selector: 'page-give-car',
    templateUrl: 'give-car.html'
})
export class GiveCarPage {

    private _transactions: any;
    private user_id: number;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private transactionProvider: TransactionProvider,
        public alertCtrl: AlertController,
        public storage: Storage,
        public toastCtrl: ToastController) {

        this.storage.get('user').then(user => this.user_id = user.id);

        this.transactionProvider.getRequest().subscribe(res => {
            this._transactions = res;
        });

        Observable.interval(4000).subscribe(() => {
            this.transactionProvider.getRequest().subscribe(res => {
                this._transactions = res;
            });
        })

    }


    showConfirm(transaction_id) {
        let confirm = this.alertCtrl.create({
            title: 'Confirmation',
            message: 'Are you sure you want to accept this request?',
            buttons: [{
                    text: 'No',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.transactionProvider.acceptRequest(this.user_id, transaction_id).subscribe(res => {
                            if (res.code != 200) {

                                let toast = this.toastCtrl.create({
                                    message: 'Error in processing your request',
                                    duration: 1500,
                                    position: 'top'
                                });

                                toast.present();

                            } else {
                                let toast = this.toastCtrl.create({
                                    message: 'Your request has been sent',
                                    duration: 1500,
                                    position: 'top'
                                });

                                toast.onDidDismiss(() => {
                                    this.navCtrl.pop();
                                });

                                toast.present();
                            }
                        })
                    }
                }
            ]
        });
        confirm.present();
    }
}
