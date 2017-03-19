import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { ModalChooseTimePage } from '../modal-choose-time/modal-choose-time';
import { ModalChooseLocationPage } from '../modal-choose-location/modal-choose-location';
import { ModalChooseCarPage } from '../modal-choose-car/modal-choose-car';
import { ModalChooseDurationPage } from '../modal-choose-duration/modal-choose-duration';
import { ModalChoosePickupLocationPage } from '../modal-choose-pickup-location/modal-choose-pickup-location';
import { DashboardPage } from '../dashboard/dashboard';

// Providers
import {TransactionProvider} from '../../providers/transaction-provider';
import { UserProvider } from '../../providers/user-provider';
@Component({
    selector: 'page-get-car',
    templateUrl: 'get-car.html'
})
export class GetCarPage {

    private _pickup_time: string;
    private _pickup_location: string;
    private _price: number;
    private _duration: any;
    private _hour: number;
    private _minute: number;
    private user_id: number;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private transactionProvider: TransactionProvider,
        private userProvider: UserProvider) {

        this.userProvider.getId().then(id => this.user_id = id);


    }

    presentModalChooseTime() {
        let modal = this.modalCtrl.create(ModalChooseTimePage);
        modal.onDidDismiss(data => {
            this._pickup_time = data.hour + " : " + data.minute + " " + data.am;
        });
        modal.present();
    }

    presentModalChooseDuration() {
        let modal = this.modalCtrl.create(ModalChooseDurationPage);
        modal.onDidDismiss(data => {
            this._duration = data.hour + " H : " + data.minute + "M";
            this._price = data.hour * 5 + data.minute * 0.12;
        });
        modal.present();
    }

    presentModalChoosePickupLocation() {
        let modal = this.modalCtrl.create(ModalChoosePickupLocationPage);
        modal.onDidDismiss(data => {
            this._pickup_location = data;
        });
        modal.present();
    }


    submitGetCar() {
        console.log('Submitting');
        let checkAllSelected = false;

        if (this._pickup_time == null || this._duration == null || this._pickup_location == null) {
            checkAllSelected = true;
        }

        if (checkAllSelected) {
            this.toastCtrl.create({
                message: 'You must fill all the inputs given',
                duration: 1500,
                position: 'top'
            }).present()

        } else {

            this.transactionProvider.postGetCar(
                this._pickup_time,
                this._pickup_location,
                this._price,
                this._duration,
                this.user_id

            ).subscribe(res => {

                if (res.code == 500) {

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
                        this.navCtrl.setRoot(DashboardPage);
                    });

                    toast.present();
                }

            });
        }
    }
}
