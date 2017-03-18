import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {UrlProvider} from './url-provider';

@Injectable()
export class AuthService {

  constructor(public http: Http) {}

  public login(body): Observable <any> {
    let bodyString = JSON.stringify(body); // Stringify payload
    return this.http.post(UrlProvider.baseUrl() + 'login', bodyString, UrlProvider.baseHeader())
      .map((res: Response) => res.json());
  }

}
