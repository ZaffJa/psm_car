import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalChooseCar page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-modal-choose-car',
  templateUrl: 'modal-choose-car.html'
})
export class ModalChooseCarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

    dismiss() {
      this.viewCtrl.dismiss();
  }

}
