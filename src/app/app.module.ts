import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

// Root page
import {MyApp} from './app.component';

// Pages
import {Login} from '../pages/login/login';
import {GetCarPage} from '../pages/get-car/get-car';
import {GiveCarPage} from '../pages/give-car/give-car';
import {GetRidePage} from '../pages/get-ride/get-ride';
import {GiveRidePage} from '../pages/give-ride/give-ride';
import {DashboardPage} from '../pages/dashboard/dashboard';
import {ModalChooseTimePage} from '../pages/modal-choose-time/modal-choose-time';
import {ModalChooseLocationPage} from '../pages/modal-choose-location/modal-choose-location';
import {ModalChooseCarPage} from '../pages/modal-choose-car/modal-choose-car';
import {ModalChoosePickupLocationPage} from '../pages/modal-choose-pickup-location/modal-choose-pickup-location';
import {ModalChooseDurationPage} from '../pages/modal-choose-duration/modal-choose-duration';
import {RegisterPage} from '../pages/register/register';


// Providers
import {AuthService} from '../providers/auth-service';
import {LocationProvider} from '../providers/location-provider';
import {UrlProvider} from '../providers/url-provider';
import {TransactionProvider} from '../providers/transaction-provider';
import {UserProvider} from '../providers/user-provider';

// Third party modules
import {ElasticModule} from 'angular2-elastic';


@NgModule({
  declarations: [
    Login, MyApp, GetCarPage, GiveCarPage, GetRidePage,
    GiveRidePage, DashboardPage, ModalChooseTimePage, ModalChooseLocationPage,
    ModalChooseCarPage, RegisterPage,ModalChoosePickupLocationPage,ModalChooseDurationPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Login, MyApp, GetCarPage, GiveCarPage,
    GetRidePage, GiveRidePage, DashboardPage, ModalChooseTimePage,
    ModalChooseLocationPage, ModalChooseCarPage, RegisterPage,
    ModalChoosePickupLocationPage,ModalChooseDurationPage
  ],
  providers: [AuthService, LocationProvider, UrlProvider, TransactionProvider, UserProvider, {
    provide: ErrorHandler,
    useClass: IonicErrorHandler,
  }]
})
export class AppModule {
}
