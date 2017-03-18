import {Component} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {UserProvider} from '../../providers/user-provider';


/*
 Generated class for the Register page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  private registerForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required],
    matric_no: ["", Validators.required],
    password: ["", Validators.required],
    re_password: ["", Validators.required]
  });

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public userProvider: UserProvider,
              private toastCtrl: ToastController) {
  }

  public registerUser(event) {
    event.preventDefault();
    let formData = this.registerForm.value;
    let password = this.registerForm.get('password').value;
    let re_password = this.registerForm.get('re_password').value;

    if(password !== re_password) {
      this.toastCtrl.create({
        message: "Password mismatch",
        duration: 1500,
        position: 'bottom'
      }).present();

    } else {
      this.userProvider.register(formData).subscribe(res => {
        if (res.code == 200) {
          this.toastCtrl.create({
            message: res.message,
            duration: 1500,
            position: 'bottom'
          }).present();

          this.navCtrl.pop();

        } else {
          console.log(res);
          this.toastCtrl.create({
            message: res.message,
            duration: 1500,
            position: 'bottom'
          }).present();
        }
      });
    }





  }

}
