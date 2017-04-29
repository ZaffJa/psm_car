import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location-provider';

import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-modal-choose-location',
  templateUrl: 'modal-choose-location.html'
})
export class ModalChooseLocationPage {

  private locations: any;
  private items: any;
  static allItems: any;
  private currentLocation: any;
  // private loader: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public locationProvider: LocationProvider,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController) {

  }

  ngOnInit() {

    console.log(this.navParams.get('userCoordinate'));

    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   duration: 3000
    // });
    // loader.present();
    // this.geolocation.getCurrentPosition().then((resp) => {

    //   this.currentLocation = {
    //     lng: resp.coords.longitude,
    //     lat: resp.coords.latitude
    //   }

    this.initializeItems();

    //   loader.dismiss();


    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

  }


  initializeItems() {
    this.locationProvider.getLocations().subscribe(res => {

      this.locations = res.data;
      this.items = []; // reset items



      this.currentLocation = this.navParams.get('userCoordinate');

      for (let i = 0; i < this.locations.length; i++) {
        this.locations[i].price = this.getPrice(this.locations[i].lat, this.locations[i].lng, this.locations[i].price_from_utm);
        this.locations[i].distance = this.getDistance(this.locations[i].lat, this.locations[i].lng);
        this.items.push(this.locations[i]);
      }
      ModalChooseLocationPage.allItems = this.items;

    });
  }

  getItems(ev) {
    // Reset items back to all of the items
    this.items = ModalChooseLocationPage.allItems;

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }
  }

  dismiss(item, price) {
    this.viewCtrl.dismiss(item, price);
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

  getPrice(lat, lng, price) {
    let destination = {
      lng: lng,
      lat: lat
    };
    return Math.round(this.getDistanceBetweenPoints(this.currentLocation, destination, 'km') * price);
  }

  getDistance(lat, lng) {
    let destination = {
      lng: lng,
      lat: lat
    };

    return this.getDistanceBetweenPoints(this.currentLocation, destination, 'km');
  }

}
