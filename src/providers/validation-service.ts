import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ValidationService {

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'invalidPhoneNumber': 'Your phone number can only contain digits and must be exactly 10 or 11 digits long',
      'passwordsShouldMatch': 'Mismatch passwords',
      'invalidMatricNo': 'Your matric number is invalid',
      'pattern': 'Invalid format'
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }


  static phoneValidator(control) {
    // Only digits
    if (control.value.match(/^[0-9]{10,11}$/)) {
      return null;
    } else {
      return { 'invalidPhoneNumber': true };
    }
  }

  static matricNoValidator(control) {
    // Only values such as A13CS0059
    if (control.value.match(/^[a-zA-Z][1-9]{2}[a-zA-Z]{2}[0-9]{4}$/)) {
      return null;
    } else {
      return { 'invalidMatricNo': true };
    }
  }

  public passwordsShouldMatch(group) {

    var newPassword = group.controls['password'].value;
    var confirmPassword = group.controls['re_password'].value;

    // If either of these fields is empty, the validation 
    // will be bypassed. We expect the required validator to be 
    // applied first. 

    if (newPassword == '' || confirmPassword == '')
      return null;

    if (newPassword != confirmPassword)
      return { 'passwordsShouldMatch': true };
    return null;
  }

}
