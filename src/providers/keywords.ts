import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Keywords provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class KeywordsProvider {

    data: any;

    private keywordsUrl = 'http://localhost:3000/keywords/';

    constructor(public http: Http) {
        this.data = null;
    }

    // Get all posts from the API
    getKeywords() {
        // if (this.data) {

        console.log();
        //     return Promise.resolve(this.data);
        // }

        return new Promise(resolve => {
            this.http.get(this.keywordsUrl)
            .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
            resolve(this.data);
                });
        });
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
