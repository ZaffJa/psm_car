import { Component, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

// Providers
import { ValidationService } from '../../providers/validation-service';


@Component({
  selector: 'control-messages',
  template: `<p ion-text *ngIf="errorMessages !== null" color="danger" padding-left>{{ errorMessage }}</p>`
})
export class ControlMessagesPage {

  @Input() control: FormControl;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
