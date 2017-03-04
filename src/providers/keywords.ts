import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { AppComponent } from '../app/app.component';
import { Keyword } from '../model/keyword';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Keywords provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KeywordsProvider {

    data: any;

    // private keywordsUrl = 'http://localhost:3000/keywords/';
    private keywordsUrl = AppComponent.API_ENDPOINT + 'keywords/';

    constructor(public http: Http) {
        this.data = null;
    }

    // Get all posts from the API
    getKeywords() {
        return this.http.get(this.keywordsUrl)
        .map((res: Response) => res.json());
    }

    createKeyword(keyword) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.keywordsUrl, JSON.stringify(keyword), { headers: headers });
    }

    deleteKeyword(id) {
        return this.http.delete(this.keywordsUrl + id);
    }

}
