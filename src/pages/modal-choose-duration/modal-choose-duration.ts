import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
@Component({
    selector: 'page-modal-choose-duration',
    templateUrl: 'modal-choose-duration.html'
})
export class ModalChooseDurationPage {

    private hour: number;
    private minute: number;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private toastCtrl: ToastController) {}

    dismiss() {

        if (this.hour == null) {
            this.toastCtrl.create({
                message: 'Please fill in the inputs',
                duration: 1500,
                position: 'top'
            }).present();
        } else if (this.hour < 1) {

            this.toastCtrl.create({
                message: 'You cannot make a rent request that are less than 1 hour',
                duration: 1500,
                position: 'top'
            }).present();

        } else {

            if(this.minute == null) {
              this.minute = 0;
            }
            this.viewCtrl.dismiss({
                'hour':this.hour,
                'minute':this.minute
            });
        }
    }

}
