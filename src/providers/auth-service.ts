import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UrlProvider } from './url-provider';

import { Storage } from '@ionic/storage';

export class User {
    name: string;
    matric_no: string;
    car: string;
    user_id: number;
    role_id: number;
    phone: number;
    constructor(name: string, matric_no: string, user_id: number, role_id: number, phone: number, car?: string) { }
}

@Injectable()
export class AuthService {
    currentUser: User;
    constructor(public http: Http, private storage: Storage) { }

    public login(body): Observable<any> {
        let bodyString = JSON.stringify(body); // Stringify payload
        return this.http.post(UrlProvider.baseUrl() + 'login', bodyString, UrlProvider.baseHeader())
            .map((res: Response) => {
                let result = res.json();

                if (result.code == 200) {
                    let user = result.data;

                    this.currentUser = new User(
                        user.name,
                        user.matric_no,
                        user.id,
                        user.role_id,
                        user.phone,
                        user.car_name
                    );
                }

                return result;
            });
    }

    public logout(): any {
        this.storage.remove('user').then(() => { });
    }

    public getUserInfo(): User {
        return this.currentUser;
    }

    public checkMatricNumber(matric_no: string): Observable<any> {

        return this.http.get(UrlProvider.baseUrl() + 'check?matric_no=' + matric_no, UrlProvider.baseHeader())
            .map((res: Response) => res.json());
    }

    public setUser() { }
}
