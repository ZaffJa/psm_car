import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
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


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public locationProvider: LocationProvider,
    private geolocation: Geolocation) { }

  ngOnInit() {

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
      this.initializeItems();
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }


  initializeItems() {
    this.locationProvider.getLocations().subscribe(res => {
      this.locations = res.data;
      this.items = []; // reset items

      for (let i = 0; i < this.locations.length; i++) {
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

  dismiss(item) {
    this.viewCtrl.dismiss(item);
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

  getPrice() {
    let dummyDestination = {
      lng: 103.629184,
      lat: 1.542449
    };
    let dummyLocation = {
      lng: this.currentLocation.longitude,
      lat: this.currentLocation.latitude
    }
    return this.getDistanceBetweenPoints(dummyLocation, dummyDestination, 'km');
  }

}
