import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

// Providers
import { TransactionProvider } from '../../providers/transaction-provider';
import { UserProvider } from '../../providers/user-provider';

// Pages
import { ViewAcceptedRequestPage } from '../view-accepted-request/view-accepted-request';

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

    viewRequest(owner_id: number) {
        this.navCtrl.push(ViewAcceptedRequestPage, {
            owner_id: owner_id
        });
    }
}
