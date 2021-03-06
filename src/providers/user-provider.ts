import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs";
import { UrlProvider } from "./url-provider";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserProvider {

    private isLoggedIn: boolean = false;

    constructor(public http: Http, public storage: Storage) {
    }

    public register(body): Observable<any> {
        let bodyString = JSON.stringify(body); // Stringify payload
        return this.http.post(UrlProvider.baseUrl() + 'register', bodyString, UrlProvider.baseHeader())
            .map((res: Response) => res.json());
    }


    public update(body): Observable<any> {
        let bodyString = JSON.stringify(body); // Stringify payload
        return this.http.post(UrlProvider.baseUrl() + 'update', bodyString, UrlProvider.baseHeader())
            .map((res: Response) => res.json());
    }


    getId(): Promise<number> {
        return this.storage.get('user').then((user) => {
            return user.id;
        });
    };

    toggleLogin(): void {
        this.isLoggedIn = !this.isLoggedIn;
    }

    checkLogin(): boolean {
        return this.isLoggedIn;;
    }

}
