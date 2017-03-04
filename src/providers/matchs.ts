import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { AppComponent } from '../app/app.component';
import { Match } from '../model/match';
import { Observable } from 'rxjs/Rx';

/*
  Generated class for the Matchs provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MatchsProvider {

    data: any;

    private matchsUrl = AppComponent.API_ENDPOINT + 'matchs/';

    constructor(public http: Http) {
        this.data = null;
    }

    // Get all posts from the API
    getMatchs() {
        return this.http.get(this.matchsUrl)
            .map((res: Response) => res.json());
    }

    createMatch(match) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.matchsUrl, JSON.stringify(match), { headers: headers });
    }

    // Update trends values for current matchs
    // updateMatchsValues(matchs): void {
    //     for (let match of matchs) {
    //         this.getGoogleTrend(match.name)
    //             .subscribe((trendValues) => {
    //                 this.http.post(this.trendsUrl, {
    //                     match: match.name,
    //                     matchId: match._id,
    //                     values: JSON.stringify(trendValues)
    //                 })
    //                     .map((res: Response) => res.json())
    //                     .subscribe((trend) => {
    //                         console.log("Match " + trend.match + " updated !");
    //                     });
    //             });
    //     }
    // }

    deleteMatch(id) {
        return this.http.delete(this.matchsUrl + id);
    }

}
