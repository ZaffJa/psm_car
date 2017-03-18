import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DashboardPage} from '../dashboard/dashboard';
import {AuthService} from '../../providers/auth-service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/catch';
import {RegisterPage} from "../register/register";

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class Login {
    form: FormGroup;
    dashboard: any = DashboardPage;

    public loginForm = this.fb.group({
        matric_no: ["", Validators.required],
        password: ["", Validators.required]
    });

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public authService: AuthService,
        public fb: FormBuilder,
        private toastCtrl: ToastController,
        public storage: Storage) {}

    doLogin(event) {
        event.preventDefault();
        let formData = this.loginForm.value;

        this.authService.login(formData).subscribe(res => {

            if (res.code == 200) {
                // this.storage.remove('user');
                this.storage.set('user',res.data);

                this.navCtrl.setRoot(DashboardPage, {
                    "message": "Hello " + res.data.name
                });
            } else {

                this.toastCtrl.create({
                    message: res.message,
                    duration: 1500,
                    position: 'bottom'
                }).present();
            }
        });
    }

    goToRegisterPage() {
        this.navCtrl.push(RegisterPage);
    }
}
