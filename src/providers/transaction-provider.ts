import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {UrlProvider} from './url-provider';
import {UserProvider} from './user-provider';


@Injectable()
export class TransactionProvider {

    constructor(public http: Http, private userProvider: UserProvider) {}

    public postGetRide(pickup_time: string, destination: any, pickup_location: any, price: number): Observable < any > {

        let id: number;
        this.userProvider.getId().then(id => id);

        let bodyString = JSON.stringify({
            'user_id': id,
            'pickup_time': pickup_time,
            'location_id': destination,
            'pickup_location': pickup_location,
            'price': price,
            'request_type': 1
        });

        return this.http.post(UrlProvider.baseUrl() + 'transaction', bodyString, UrlProvider.baseHeader())
            .map((res: Response) => res.json());

    }

    public postGetCar(pickup_time: string, pickup_location: any, price: number, duration: string): Observable < any > {

        let id: number;
        this.userProvider.getId().then(id => id);

        let bodyString = JSON.stringify({
            'user_id': id,
            'pickup_time': pickup_time,
            'pickup_location': pickup_location,
            'duration': duration,
            'price': price,
            'request_type': 2
        });

        return this.http.post(UrlProvider.baseUrl() + 'transaction', bodyString, UrlProvider.baseHeader())
            .map((res: Response) => res.json());

    }

}
