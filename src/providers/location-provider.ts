import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import {UrlProvider} from "./url-provider";
@Injectable()
export class LocationProvider {


  constructor(public http: Http) {}

  public getLocations(): Observable <any> {
    return this.http.get(UrlProvider.baseUrl() + 'locations')
      .map(res => res.json());
  }

}
