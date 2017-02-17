import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Trends provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TrendsProvider {

    data: any;
    private trendsUrl = 'http://localhost:8080/api/trends/';

    constructor(public http: Http) {
        this.data = null;
    }

    // Get all posts from the API
    getTrends() {
        if (this.data) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {
            this.http.get(this.trendsUrl)
                .map(res => res.json())
                .subscribe(data => {
                    this.data = data;
                    resolve(this.data);
                });
        });
    }

    createTrend(trend) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(this.trendsUrl, JSON.stringify(trend), { headers: headers })
            .subscribe(res => {
                console.log(res.json());
            });
    }

    deleteTrend(id) {
        this.http.delete(this.trendsUrl + id).subscribe((res) => {
            console.log(res.json());
        });
    }

}
