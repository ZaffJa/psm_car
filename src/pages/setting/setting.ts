import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserProvider } from '../../providers/user-provider';
import { AuthService } from '../../providers/auth-service';
import { ValidationService } from '../../providers/validation-service';

import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  submitted = false;
  registerForm: FormGroup;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public userProvider: UserProvider,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public authService: AuthService,
    public storage: Storage,
    public loading: LoadingController) { }

  ionViewCanEnter() {
    return this.storage.get('user').then(user => {

      this.user = user;

      let toggle = false;
      let phone: string = "";
      let email: string = "";

      if (user.role_id == 3) {
        toggle = true;
      }

      if (user.phone != null) {
        phone = "" + user.phone;
      }
      if (user.email != null) {
        email = "" + user.email;
      }

      console.log(user);

      this.registerForm = this.fb.group({
        user_id: [user.id],
        old_password: ["", Validators.required],
        password: ["", Validators.required],
        email: [email, Validators.required],
        phone: [phone, Validators.compose([
          Validators.required,
          Validators.minLength(10),
          ValidationService.phoneValidator,
          Validators.maxLength(11)
        ])],
        re_password: ["", Validators.compose([
          Validators.required,
        ])],
        car_name: [user.car_name, Validators.pattern('[a-zA-Z ]*')],
        isToggled: [toggle]
      }, { validator: this.passwordsShouldMatch });

      return true;
    });
  }

  public resetCar() {
    let isToggled = this.registerForm.controls['isToggled'].value;

    if (!isToggled) {
      this.registerForm.controls['car_name'].setValue("");
    }
  }


  public passwordsShouldMatch(group: FormGroup) {

    var newPassword = group.controls['password'].value;
    var confirmPassword = group.controls['re_password'].value;

    // If either of these fields is empty, the validation 
    // will be bypassed. We expect the required validator to be 
    // applied first. 

    if (newPassword == '' || confirmPassword == '')
      return null;

    if (newPassword != confirmPassword)
      return { passwordsShouldMatch: true };
    return null;
  }

  public onUpdate(formData: FormGroup) {

    // if(!formData.valid) {
    //   this.toastCtrl.create({
    //       message: 'Error on submitting your request',
    //       duration: 1500,
    //       position: 'bottom'
    //     }).present();
    // }

    let loading = this.loading.create({
      spinner: 'bubbles',
      content: 'Updating..'
    });

    loading.present();

    this.userProvider.update(formData.value).subscribe(res => {
      loading.dismiss();

      if (res.code == 200) {
        this.toastCtrl.create({
          message: res.message,
          duration: 1500,
          position: 'bottom'
        }).present();

        this.storage.set('user', res.data);
        console.log(res);

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

