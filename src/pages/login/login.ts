import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

//Pages
import { DashboardPage } from '../dashboard/dashboard';
import { RegisterPage } from "../register/register";
// Providers
import { AuthService } from '../../providers/auth-service';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {
    login: { matric_no?: string, password?: string } = {};
    submitted = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public authService: AuthService,
        private toastCtrl: ToastController,
        public storage: Storage,
        public loadingCtrl: LoadingController) {

        if (navParams.data.message != null) {

            this.toastCtrl.create({
                message: navParams.data.message,
                duration: 1500,
                position: 'bottom'
            }).present();
        }
    }

    onLogin(form: NgForm) {
        this.submitted = true;
        let loader = this.loadingCtrl.create({
            content: "Please wait...",
            duration: 3000
        });
        loader.present();

        if (form.valid) {
            this.authService.login(this.login).subscribe(res => {
                this.storage.set('user', res.data);
                loader.dismiss();
                this.navCtrl.setRoot(DashboardPage, {
                    "message": "Hello " + res.data.name
                });

            }, err => {
                this.toastCtrl.create({
                    message: 'An error has occured',
                    duration: 1500,
                    position: 'bottom'
                }).present();
            });

        }
    }

    onSignup() {
        this.navCtrl.push(RegisterPage);
    }
}
