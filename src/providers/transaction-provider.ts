import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { UrlProvider } from './url-provider';
import { UserProvider } from './user-provider';


@Injectable()
export class TransactionProvider {

    constructor(public http: Http, private userProvider: UserProvider) { }

    public postGetRide(pickup_time: string, destination: any, pickup_location: any, price: number, id: number): Observable<any> {

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

    public postGetCar(pickup_time: string, pickup_location: any, price: number, duration: string, id: number): Observable<any> {

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


    public getHistory(id: number): Observable<any> {

        return this.http.get(UrlProvider.baseUrl() + 'transactions?user_id=' + id, UrlProvider.baseHeader())
            .map((res: Response) => res.json());
    }

    public getRequest(user_id: number): Observable<any> {

        return this.http.get(UrlProvider.baseUrl() + 'transactions/owner?user_id=' + user_id, UrlProvider.baseHeader())
            .map((res: Response) => res.json());
    }

    public getDashboard(user_id: number): Observable<any> {
        return this.http.get(UrlProvider.baseUrl() + 'dashboard?user_id=' + user_id, UrlProvider.baseHeader())
            .map((res: Response) => res.json());
    }

    public acceptRequest(owner_id: number, transaction_id: number): Observable<any> {

        let bodyString = JSON.stringify({
            'owner_id': owner_id,
            'transaction_id': transaction_id
        });

        return this.http.post(UrlProvider.baseUrl() + 'transaction/accept', bodyString, UrlProvider.baseHeader())
            .map((res: Response) => res.json());

    }

}
