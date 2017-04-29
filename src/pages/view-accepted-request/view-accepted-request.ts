import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TransactionProvider } from '../../providers/transaction-provider';
import { DashboardPage } from '../dashboard/dashboard';


declare var window;
@Component({
  selector: 'page-view-accepted-request',
  templateUrl: 'view-accepted-request.html'
})
export class ViewAcceptedRequestPage {

  transaction: any;
  user: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public viewCtrl: ViewController,
    public transactionProvider: TransactionProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {

    this.transaction = this.navParams.get('transaction');
    this.storage.get('user').then(user => {
      this.user = user;
    });
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  public call(phone) {
    window.open("tel:" + phone);
  }

  public openMap(lat, lng, name) {
    // window.open("geo:?q=" + map,"_system");
    window.open('geo:?q=' + lat + ',' + lng + '(' + name + ')', '_system');
  }

  public userCancelRequest(transaction) {

    this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure you want to cancel this request?',
      buttons: [{
        text: 'No',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.transactionProvider.userCancelRequest(transaction, this.user.id)
            .subscribe(res => {
              this.transaction = res.data;
              console.log(res);
            });
        }
      }]
    }).present();

  }
  // public ownerCancelRequest(transaction) {

  //   this.alertCtrl.create({
  //     title: 'Confirmation',
  //     message: 'Are you sure you want to cancel this request?',
  //     buttons: [{
  //       text: 'No',
  //       handler: () => {
  //         console.log('Disagree clicked');
  //       }
  //     },
  //     {
  //       text: 'Yes',
  //       handler: () => {
  //         this.transactionProvider.ownerCancelRequest(transaction)
  //           .subscribe(res => {

  //             console.log(res);
  //           });
  //       }
  //     }
  //     ]
  //   }).present();

  // }


  public doneRequest(transaction) {

    this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Is this request been completed?',
      buttons: [{
        text: 'No',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Yes',
        handler: () => {
          this.transactionProvider.doneRequest(transaction)
            .subscribe(res => {

              this.toastCtrl.create({
                message: res.message,
                duration: 1500,
                position: 'top'
              }).present();

              this.transaction = res.data;

              this.navCtrl.setRoot(DashboardPage);
            });
        }
      }
      ]
    }).present();



  }

}
