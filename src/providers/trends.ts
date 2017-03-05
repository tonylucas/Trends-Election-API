import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { AppComponent } from '../app/app.component';
import { Trend } from '../model/trend';
import { Keyword } from '../model/keyword';
import { Parent } from '../model/parent';
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
    private googleTrendsUrl = AppComponent.API_ENDPOINT + 'google-trends/';
    private trendsUrl = AppComponent.API_ENDPOINT + 'trends/';

    constructor(public http: Http) {
        this.data = null;
    }

    // Get all values from Google API for one keyword
    getGoogleTrend(keyword): any {
        if (keyword instanceof Array) {
            return this.http.post(this.googleTrendsUrl, {
                keywords: keyword
            })
                .map((res: Response) => res.json());
        } else {
            return this.http.get(this.googleTrendsUrl + keyword)
                .map((res: Response) => res.json());
        }
    }



    // Get trend values for one keyword/match
    getTrendFromParent(parentId): Observable<Parent> {
        return this.http.get(this.trendsUrl + '/parent/' + parentId)
            .map((res: Response) => res.json());
    }

    // Delete trends from parent ID (keyword or match)
    deleteTrendsFromParentId(parentId): Observable<Response> {
        return this.http.delete(this.trendsUrl + '/parentid/' + parentId);
    }

    // Get trends from parent ID (keyword or match)
    getTrendsFromParentId(parentId): Observable<Trend[]> {
        return this.http.get(this.trendsUrl + '/parentid/' + parentId)
        .map((res: Response) => res.json());
    }

    // Update trends values for keywords
    updateTrendsValues(keywords): void {
        for (let keyword of keywords) {
            this.getGoogleTrend(keyword.name)
                .subscribe((trendValues) => {
                    this.http.post(this.trendsUrl, {
                        parentType: "keyword",
                        parentName: keyword.name,
                        parentId: keyword._id,
                        values: JSON.stringify(trendValues)
                    })
                        .map((res: Response) => res.json())
                        .subscribe((trend) => {
                            console.log(trend);
                            console.log("Keyword " + trend.parentName + " updated !");
                        });
                });
        }
    }

    // Update trends values for matchs (different Google Trends route)
    updateTrendsValuesMulti(matchs): void {
        console.log("matchs");
        console.log(matchs);
        for (let match of matchs) {
            this.getGoogleTrend(match.keywords)
                .subscribe((trendValues) => {
                    console.log(trendValues);
                    this.http.post(this.trendsUrl, {
                        parentType: "match",
                        parentName: match.name,
                        parentId: match._id,
                        values: JSON.stringify(trendValues)
                    })
                        .map((res: Response) => res.json())
                        .subscribe((trend) => {
                            console.log(trend);
                            console.log("Match " + match.name + " updated !");
                        });
                });
        }
    }

    // Delete trend for one keyword
    deleteTrend(keyword) {
        return this.http.delete(this.trendsUrl + keyword._id);
    }

}
