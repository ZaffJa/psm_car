import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { TransactionProvider } from '../../providers/transaction-provider';

import { ViewAcceptedRequestPage } from '../view-accepted-request/view-accepted-request';



@Component({
  selector: 'page-up-coming-history',
  templateUrl: 'up-coming-history.html'
})
export class UpComingHistoryPage {

  public _transactions: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public transactionProvider: TransactionProvider,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

    let loader = this.loadingCtrl.create({
      content: "Loading your history",
      duration: 3000
    });
    loader.present();

    this.storage.get('user').then(user => {

      this.transactionProvider.viewUpcomingRequest("user_id=" + user.id)
        .subscribe(res => {
          this._transactions = res;
          console.log(this._transactions);
          loader.dismiss();
        });
    });
  }

  public viewRequest(transaction) {
    let modal = this.modalCtrl.create(ViewAcceptedRequestPage, { transaction });

    modal.present();
  }



}
