import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {LocationProvider} from '../../providers/location-provider';

@Component({
  selector: 'page-modal-choose-location',
  templateUrl: 'modal-choose-location.html'
})
export class ModalChooseLocationPage {

  private locations:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public locationProvider: LocationProvider) {}

  ionViewDidLoad() {
    this.locationProvider.getLocations().subscribe(res => {
      this.locations = res.data;
      console.log(res);
    });
  }

  dismiss(item) {
    this.viewCtrl.dismiss(item);
  }

}
