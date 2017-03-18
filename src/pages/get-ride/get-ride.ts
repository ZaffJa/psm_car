import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, ToastController} from 'ionic-angular';

// Modals
import {ModalChooseTimePage} from '../modal-choose-time/modal-choose-time';
import {ModalChooseLocationPage} from '../modal-choose-location/modal-choose-location';
import {ModalChooseCarPage} from '../modal-choose-car/modal-choose-car';
import {ModalChoosePickupLocationPage} from '../modal-choose-pickup-location/modal-choose-pickup-location';
import { Storage } from '@ionic/storage';

// Pages
import {DashboardPage} from '../dashboard/dashboard';

// Providers
import {TransactionProvider} from '../../providers/transaction-provider';
import { UserProvider } from '../../providers/user-provider';


@Component({
    selector: 'page-get-ride',
    templateUrl: 'get-ride.html'
})
export class GetRidePage {

    private _location: string;
    private _location_id: number;
    private _pickup_time: string;
    // private _car: string = "Choose Car (Optional)";
    private _pickup_location: string;
    private _price: number;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private transactionProvider: TransactionProvider,
        public storage: Storage,
        private userProvider: UserProvider) {
            // this.storage.get('user').then(value => {
            //     console.log('Hello');
            //     console.log(value);
            // });

            this.userProvider.getId().then(id => console.log(id));
            console.log('hello');
        }


    presentModalChooseTime() {
        let modal = this.modalCtrl.create(ModalChooseTimePage);
        modal.onDidDismiss(data => {
            this._pickup_time = data.hour + " : " + data.minute + " " + data.am;
        });
        modal.present();
    }

    presentModalChooseLocation() {
        let modal = this.modalCtrl.create(ModalChooseLocationPage);
        modal.onDidDismiss(data => {
            this._location_id = data.id;
            this._location = data.name;
            this._price = data.price_from_utm;
        });
        modal.present();
    }

    presentModalChoosePickupLocation() {
        let modal = this.modalCtrl.create(ModalChoosePickupLocationPage);
        modal.onDidDismiss(data => {
            console.log(data);
            this._pickup_location = data;
        });
        modal.present();
    }

    // presentModalChooseCar() {
    //     let modal = this.modalCtrl.create(ModalChooseCarPage);
    //     modal.onDidDismiss(data => {
    //         this._car = data;
    //     });
    //     modal.present();
    // }

    submitGetRide() {

        let checkAllSelected = false;

        if (this._pickup_time == "Choose Pickup Time" || this._location == "Choose Destination" || this._pickup_location == "Choose Pickup Location") {
            checkAllSelected = true;
        }

        if (checkAllSelected) {
            this.toastCtrl.create({
                message: 'You must fill all the inputs given',
                duration: 1500,
                position: 'top'
            }).present()

        } else {

            this.transactionProvider.postGetRide(
                this._pickup_time,
                this._location_id,
                this._pickup_location,
                this._price
            ).subscribe(res => {

                let toast = this.toastCtrl.create({
                    message: 'Your request has been sent',
                    duration: 1500,
                    position: 'top'
                });

                toast.onDidDismiss(() => {
                    this.navCtrl.setRoot(DashboardPage);
                });

                toast.present();

            });
        }
    }
}
