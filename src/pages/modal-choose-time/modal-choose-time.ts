import {Component} from '@angular/core';
import {NavController, NavParams, ViewController, ToastController} from 'ionic-angular';
@Component({
    selector: 'page-modal-choose-time',
    templateUrl: 'modal-choose-time.html'
})
export class ModalChooseTimePage {

    private hour: number;
    private minute: number;
    private am: string = "AM";
    private isToggled:boolean;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        private toastCtrl: ToastController) {
          this.isToggled == false;
        }

    updateToggle() {
        if (this.isToggled) {
            this.am = "PM";
        } else {
            this.am = "AM";
        }
    }

    dismiss() {
        if (this.hour == null) {
            this.toastCtrl.create({
                message: 'Please fill in the inputs',
                duration: 1500,
                position: 'top'
            }).present();
        } else if (this.hour < 1) {
            this.resetTime();
            this.toastCtrl.create({
                message: 'Error in time allocation',
                duration: 1500,
                position: 'top'
            }).present();

        } else if (this.hour > 12 || this.minute > 60) {

            this.resetTime();
            this.toastCtrl.create({
                message: 'Error in time allocation',
                duration: 1500,
                position: 'top'
            }).present();

        } else {

            if (this.minute == null || this.minute < 1) {
                this.minute = 0;

            }
            this.viewCtrl.dismiss({
                'hour': this.hour,
                'minute': this.minute,
                'am': this.am
            });
        }
    }

    resetTime() {
      this.hour = null;
      this.minute = null;
    }

}
