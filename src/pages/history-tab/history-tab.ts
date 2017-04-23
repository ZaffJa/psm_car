import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { UpComingHistoryPage } from '../up-coming-history/up-coming-history';

@Component({
  selector: 'page-history-tab',
  templateUrl: 'history-tab.html'
})
export class HistoryTabPage {
  tab1Root: any = UpComingHistoryPage;
  tab2Root: any = HistoryPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }


}
