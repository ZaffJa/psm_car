import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';


// Pages
import { DashboardPage } from '../dashboard/dashboard';

// Modals
import { ModalChooseTimePage } from '../modal-choose-time/modal-choose-time';
import { ModalChooseDurationPage } from '../modal-choose-duration/modal-choose-duration';
import { ModalChoosePickupLocationPage } from '../modal-choose-pickup-location/modal-choose-pickup-location';

// Providers
import { TransactionProvider } from '../../providers/transaction-provider';
import { UserProvider } from '../../providers/user-provider';
@Component({
    selector: 'page-get-car',
    templateUrl: 'get-car.html'
})
export class GetCarPage {

    private _pickup_time: string;
    private _pickup_location: string;
    private _price: number;
    private _seater: number;
    private _duration: string;
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
        private userProvider: UserProvider,
        private geolocation: Geolocation,
        public http: Http) {

        this.tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        this.localISOTime = (new Date(Date.now() - this.tzoffset)).toISOString().slice(0, -1);
        this._seater = 5;
        this._price = 0;
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

    getPrice() {

        if (this._duration) {
            let time = this._duration.split(':');
            let hours = parseInt(time[0]);
            let minutes = parseInt(time[1]);

            if (this._seater == 5) {
                this._price = hours * 5 + minutes * 0.12;
            } else if (this._seater == 7) {
                this._price = hours * 7 + minutes * 0.12;
            } else if (this._seater == 9) {
                this._price = hours * 9 + minutes * 0.12;
            }
        } else {
            this._price = 0;
        }

    }


    submitGetCar() {
        console.log('Submitting');
        let checkAllSelected = false;

        if (this._duration == null || this._pickup_location == null) {
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
                this.localISOTime,
                this._seater,
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
