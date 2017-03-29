import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { UserProvider } from '../../providers/user-provider';
import { AuthService } from '../../providers/auth-service';
import { ValidationService } from '../../providers/validation-service';

@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})

export class RegisterPage {

    submitted = false;
    registerForm: FormGroup;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public fb: FormBuilder,
        public userProvider: UserProvider,
        private toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public authService: AuthService) {

        this.registerForm = this.fb.group({
            name: ["", Validators.compose(
                [Validators.required,
                Validators.minLength(5),
                Validators.pattern('[a-zA-Z ]*') // Accepts alphabets and spaces only
                ])],
            phone: ["", Validators.compose([
                Validators.required,
                Validators.minLength(10),
                ValidationService.phoneValidator,
                Validators.maxLength(11)
            ])],
            matric_no: ["", Validators.compose(
                [Validators.required,
                Validators.pattern('^[a-zA-Z][1-9]{2}[a-zA-Z]{2}[0-9]{4}$') // Only accepts string like A12CS0011
                ])],
            password: ["", Validators.required],
            re_password: ["", Validators.compose([
                Validators.required,
            ])],
            car_name: ["", Validators.pattern('[a-zA-Z ]*')],
            isToggled: [false]
        }, { validator: this.passwordsShouldMatch });
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


    public onRegister(formData: FormGroup) {

        this.authService.checkMatricNumber(formData.value.matric_no).subscribe(res => {

            if (res) {
                console.log('Matric');
                formData.controls['matric_no'].setErrors({ 'alreadyExist': true });
            } else {
                let confirm = this.alertCtrl.create({
                    title: 'Confirmation',
                    message: 'By clicking YES you are agreeing to the Terms and Conditions',
                    buttons: [{
                        text: 'No',
                        handler: () => {
                            console.log('Disagree clicked');
                        }
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            console.log("yes");
                            this.userProvider.register(formData.value).subscribe(res => {
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
                    ]
                });
                confirm.present();
            }

        })
    }
}
