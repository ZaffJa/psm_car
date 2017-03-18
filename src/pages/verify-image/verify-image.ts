import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the VerifyImage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-verify-image',
    templateUrl: 'verify-image.html',
    styles: [`
        
    `]
})
export class VerifyImagePage {

    private _checkPrivate = true;
    constructor(public navCtrl: NavController, public navParams: NavParams,
        public toastCtrl: ToastController) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad VerifyImagePage');
    }


    checkClick() {
        this._checkPrivate = !this._checkPrivate;

        if (this._checkPrivate) {

            this.showToastWithCloseButton('You have opt in to public mode. Your members will get update about this message.');
        } else {

            this.showToastWithCloseButton('You have opt in to private mode. Your members will not get update about this message.');
        }
        console.log(this._checkPrivate);
    }

    showToastWithCloseButton(message: string) {
        const toast = this.toastCtrl.create({
            message: message,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    }

}
