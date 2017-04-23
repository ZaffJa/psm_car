import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

// Root page
import { MyApp } from './app.component';

// Pages
import { Login } from '../pages/login/login';
import { GetCarPage } from '../pages/get-car/get-car';
import { GiveCarPage } from '../pages/give-car/give-car';
import { GetRidePage } from '../pages/get-ride/get-ride';
import { GiveRidePage } from '../pages/give-ride/give-ride';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ModalChooseTimePage } from '../pages/modal-choose-time/modal-choose-time';
import { ModalChooseLocationPage } from '../pages/modal-choose-location/modal-choose-location';
import { ModalChooseCarPage } from '../pages/modal-choose-car/modal-choose-car';
import { ModalChoosePickupLocationPage } from '../pages/modal-choose-pickup-location/modal-choose-pickup-location';
import { ModalChooseDurationPage } from '../pages/modal-choose-duration/modal-choose-duration';
import { RegisterPage } from '../pages/register/register';
import { ControlMessagesPage } from '../pages/control-messages/control-messages';
import { HistoryPage } from '../pages/history/history';
import { SettingPage } from '../pages/setting/setting';
import { GoogleMapsPage } from '../pages/google-maps/google-maps';
import { ViewAcceptedRequestPage } from '../pages/view-accepted-request/view-accepted-request';
import { HistoryTabPage } from '../pages/history-tab/history-tab';
import { UpComingHistoryPage } from '../pages/up-coming-history/up-coming-history';


// Providers
import { AuthService } from '../providers/auth-service';
import { LocationProvider } from '../providers/location-provider';
import { UrlProvider } from '../providers/url-provider';
import { TransactionProvider } from '../providers/transaction-provider';
import { UserProvider } from '../providers/user-provider';
import { ValidationService } from '../providers/validation-service';

// Third party modules
import { ElasticModule } from 'angular2-elastic';

@NgModule({
    declarations: [
        Login, MyApp, GetCarPage, GiveCarPage, GetRidePage,
        GiveRidePage, DashboardPage, ModalChooseTimePage, ModalChooseLocationPage,
        ModalChooseCarPage, RegisterPage, ModalChoosePickupLocationPage, ModalChooseDurationPage,
        HistoryPage, ControlMessagesPage, GoogleMapsPage, ViewAcceptedRequestPage, HistoryTabPage,
        UpComingHistoryPage, SettingPage

    ],
    imports: [
        IonicModule.forRoot(MyApp, {
            tabsHideOnSubPages: false
        }),
        IonicStorageModule.forRoot(),
        ElasticModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        Login, MyApp, GetCarPage, GiveCarPage,
        GetRidePage, GiveRidePage, DashboardPage, ModalChooseTimePage,
        ModalChooseLocationPage, ModalChooseCarPage, RegisterPage,
        ModalChoosePickupLocationPage, ModalChooseDurationPage,
        HistoryPage, ControlMessagesPage, GoogleMapsPage, ViewAcceptedRequestPage, HistoryTabPage,
        UpComingHistoryPage, SettingPage
    ],
    providers: [AuthService, LocationProvider, UrlProvider, TransactionProvider, UserProvider, ValidationService,
        Geolocation, {
            provide: ErrorHandler,
            useClass: IonicErrorHandler,
        }]
})
export class AppModule { }
