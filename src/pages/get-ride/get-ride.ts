import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

// Modals
import { ModalChooseTimePage } from '../modal-choose-time/modal-choose-time';
import { ModalChooseLocationPage } from '../modal-choose-location/modal-choose-location';
import { ModalChoosePickupLocationPage } from '../modal-choose-pickup-location/modal-choose-pickup-location';
import { Storage } from '@ionic/storage';

// Pages
import { DashboardPage } from '../dashboard/dashboard';

// Providers
import { TransactionProvider } from '../../providers/transaction-provider';
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
    private user_id: number;
    private tzoffset: any;
    private localISOTime: any;
    private currentLocation: any;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private transactionProvider: TransactionProvider,
        public storage: Storage,
        private userProvider: UserProvider,
        private geolocation: Geolocation) {

        this.tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        this.localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);

        this.userProvider.getId().then(id => this.user_id = id);

        this.geolocation.getCurrentPosition().then((resp) => {

            this.currentLocation = resp.coords;

            let dummyLocation = {
                lng: 103.629184,
                lat: 1.542449
            };

            let dummyDestination = {
                lng: resp.coords.longitude,
                lat: resp.coords.latitude
            }

            console.log(this.getDistanceBetweenPoints(dummyLocation, dummyDestination, 'km'))
            console.log(resp);
            // resp.coords.latitude
            // resp.coords.longitude
        }).catch((error) => {
            console.log('Error getting location', error);
        });
    }


    presentModalChooseTime() {
        let modal = this.modalCtrl.create(ModalChooseTimePage);
        modal.onDidDismiss(data => {

            if (data != null) {
                this._pickup_time = data.hour + " : " + data.minute + " " + data.am;

            }
        });
        modal.present();
    }

    presentModalChooseLocation() {
        let modal = this.modalCtrl.create(ModalChooseLocationPage);
        modal.onDidDismiss(data => {
            if (data != null) {
                this._location_id = data.id;
                this._location = data.name;
                this._price = data.price_from_utm;
            }
        });
        modal.present();
    }

    presentModalChoosePickupLocation() {
        let modal = this.modalCtrl.create(ModalChoosePickupLocationPage);
        modal.onDidDismiss(data => {

            if (data != null) {
                this._pickup_location = data;

            }
        });
        modal.present();
    }

    submitGetRide() {

        this.localISOTime = this.localISOTime.replace("T", " ");
        this.localISOTime = this.localISOTime.substring(0, this.localISOTime.indexOf("."));


        let checkAllSelected = false;

        if (this._location == null || this._pickup_location == null) {
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
                this.localISOTime,
                this._location_id,
                this._pickup_location,
                this._price,
                this.user_id,

            ).subscribe(res => {
                console.log(res);
                console.log(this.user_id);
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


    toRad(x) {
        return x * Math.PI / 180;
    }

    getDistanceBetweenPoints(start, end, units) {

        let earthRadius = {
            miles: 3958.8,
            km: 6371
        };

        let R = earthRadius[units || 'miles'];
        let lat1 = start.lat;
        let lon1 = start.lng;
        let lat2 = end.lat;
        let lon2 = end.lng;

        let dLat = this.toRad((lat2 - lat1));
        let dLon = this.toRad((lon2 - lon1));
        let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = R * c;

        return d;

    }




}
