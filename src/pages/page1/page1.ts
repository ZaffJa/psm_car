import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  styles: [`
    .hello {
      color: red;
    }
  `]
})
export class Page1 {

  constructor(public navCtrl: NavController) {

  }

}
