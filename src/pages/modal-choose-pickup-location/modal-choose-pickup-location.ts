import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-modal-choose-pickup-location',
  templateUrl: 'modal-choose-pickup-location.html'
})
export class ModalChoosePickupLocationPage {

  private pickup_location: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss(this.pickup_location);
  }

}
