import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Providers
import {TransactionProvider} from '../../providers/transaction-provider';
import { UserProvider } from '../../providers/user-provider';

@Component({
    selector: 'page-history',
    templateUrl: 'history.html'
})
export class HistoryPage {

    private _transactions: any;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public transactionProvider: TransactionProvider,
        public userProvider: UserProvider,
        public storage: Storage) {

        this.storage.get('user').then(user => {

            this.transactionProvider.getHistory(user.id)
                .subscribe(res => {
                    this._transactions = res;
                    console.log(this._transactions);
                });
        });
    }
}
