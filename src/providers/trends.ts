import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { Trend } from '../model/trend';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

/*
  Generated class for the Trends provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrendsProvider {

    data: any;
    keywordsUrl = "http://localhost:3000/trends/";

    constructor(public http: Http) {
        this.data = null;
    }

    // Get all posts from the API
    getTrend(keyword): Observable<Trend[]> {
        // if (this.data) {
        //     return Promise.resolve(this.data);
        // }
        return this.http.get(this.keywordsUrl + keyword)
            .map((res: Response) => res.json());
    }

}
