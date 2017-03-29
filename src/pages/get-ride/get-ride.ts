import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';

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
    private userCoordinate: any;


    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        private toastCtrl: ToastController,
        private transactionProvider: TransactionProvider,
        public storage: Storage,
        private userProvider: UserProvider,
        private geolocation: Geolocation,
        public http: Http) {

        this.tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        this.localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);

        this.userProvider.getId().then(id => this.user_id = id);
    }

    getLatLng() {

        if (this._pickup_location == null || this._pickup_location == '') {
            this.geolocation.getCurrentPosition().then((resp) => {

                let lng = resp.coords.longitude;
                let lat = resp.coords.latitude;

                this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=AIzaSyDUkgjuoLswQLC8m9SeWWr8hoES3PZ3Ark')
                    .subscribe((res: any) => {

                        if (res.json().status == "OK") {
                            this._pickup_location = res.json().results[0].formatted_address;
                            this.userCoordinate = res.json().results[0].geometry.location;
                        } else {
                            this.toastCtrl.create({
                                message: 'Error! Please insert correct address',
                                duration: 1500,
                                position: 'top'
                            }).present()
                            console.log(res.json());
                        }
                    });

            }).catch((error) => {
                console.log('Error getting location', error);
            });
        } else {
            let uri = encodeURIComponent(this._pickup_location);
            return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + uri + '&=AIzaSyDUkgjuoLswQLC8m9SeWWr8hoES3PZ3Ark')
                .subscribe(res => {
                    if (res.json().status == "OK") {
                        this._pickup_location = res.json().results[0].formatted_address;
                        this.userCoordinate = res.json().results[0].geometry.location;
                    } else {
                        this.toastCtrl.create({
                            message: 'Error! Please insert correct address',
                            duration: 1500,
                            position: 'top'
                        }).present()
                        console.log(res.json());
                    }
                });
        }
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

        if (this._pickup_location == null || this._pickup_location == '') {

            this.toastCtrl.create({
                message: 'Please choose pickup location first',
                duration: 1500,
                position: 'top'
            }).present()

        } else {
            let modal = this.modalCtrl.create(ModalChooseLocationPage, {
                userCoordinate: this.userCoordinate
            });
            modal.onDidDismiss(data => {
                if (data != null) {
                    this._location_id = data.id;
                    this._location = data.name;
                    this._price = data.price;
                }
            });
            modal.present();
        }
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

        if (this._pickup_location == null) {
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
}
