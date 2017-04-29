import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UrlProvider {

  constructor(public http: Http) { }

  public static baseUrl(): string {
    // return 'http://psm.dev/api/';
    return 'http://psm.zaff.pro/api/';
  }

  public static baseHeader(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return new RequestOptions({ headers: headers });
  }

}
