import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { KeywordsProvider } from '../../providers/keywords';
import { TrendsProvider } from '../../providers/trends';
import { MatchsProvider } from '../../providers/matchs';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';

import { Trend } from '../../model/trend';
import { Keyword } from '../../model/keyword';
import { Parent } from '../../model/parent';
import { Match } from '../../model/match';


@Component({
    selector: 'list-keywords',
    templateUrl: 'list-keywords.html'
})
export class ListKeywords implements OnInit {

    keywords: Keyword[];
    matchs: Match[];
    newMatch: {
        title: string,
        subTitle: string,
        keywords: string[],
        endDate: string,
        parentMatchId: string
    };

    constructor(
        public keywordsProvider: KeywordsProvider,
        public trendsProvider: TrendsProvider,
        public matchsProvider: MatchsProvider,
        private router: Router,
        public af: AngularFire) {

    }

    ngOnInit() {
        this.getKeywords().subscribe((keywords) => {
            this.keywords = keywords;
            console.log(keywords);
            for (let keyword of this.keywords) {
                this.getTrendFromParent(keyword._id)
                    .subscribe((trend) => {
                        if (trend) {
                            keyword.createdAt = trend.createdAt;
                        }
                    });
            }
        });

        this.getMatchs().subscribe((matchs) => {
            this.matchs = matchs;
            console.log("Matchs :", this.matchs);
            for (let match of this.matchs) {
                this.getTrendFromParent(match._id)
                    .subscribe((trend) => {
                        if (trend) {
                            match.createdAt = trend.createdAt;
                        }
                    });
            }
        });

        this.newMatch = {
            title: "",
            subTitle: "",
            keywords: [],
            endDate: "",
            parentMatchId: ""
        };

    }

    // Delete a keyword from id
    deleteKeyword(keywordId): void {
        this.keywordsProvider.deleteKeyword(keywordId).subscribe((res) => {
            this.router.navigate(['/keywords']);
        });
    }

    // Delete a match from id
    deleteMatch(matchId): void {
        this.matchsProvider.deleteMatch(matchId).subscribe((res) => {
            this.router.navigate(['/keywords']);
        });
    }

    // Delete array of trends
    deleteTrends(trends): void {
        for (let trend of trends) {
            this.trendsProvider.deleteTrend(trend);
        }
    }

    // Update trends values for current keywords
    updateKeywords(): void {
        this.keywords.forEach((keyword, index) => {
            this.trendsProvider.deleteTrendsFromParentId(keyword._id)
                .subscribe((res) => {
                    console.log(res);
                    if (this.keywords.length == index + 1) {
                        this.trendsProvider.updateTrendsValues(this.keywords);
                    }
                });
        });
    }

    // Update trends values for current keywords
    updateMatchs(): void {
        this.matchs.forEach((match, index) => {
            this.trendsProvider.deleteTrendsFromParentId(match._id)
                .subscribe((res) => {
                    if (this.matchs.length == index + 1) {
                        this.trendsProvider.updateTrendsValuesMulti(this.matchs);
                    }
                });
        });
    }

    // Get all current keywords
    getKeywords(): Observable<Keyword[]> {
        return this.keywordsProvider.getKeywords();
    }

    // Get all current matchs
    getMatchs(): Observable<Match[]> {
        return this.matchsProvider.getMatchs();
    }

    // Get trend values for one keyword/match
    getTrendFromParent(parentId): Observable<Parent> {
        return this.trendsProvider.getTrendFromParent(parentId);
    }

    createMatch(keywords: string[]): void {
        console.log(this.newMatch);
        let match = {
            title: this.newMatch.title,
            subTitle: this.newMatch.subTitle,
            keywords: this.newMatch.keywords,
            endDate: this.newMatch.endDate,
            parentMatchId: this.newMatch.parentMatchId,
            type: "",
        };
        console.log(match);
        this.matchsProvider.createMatch(match)
            .subscribe((match) => {
                console.log(match);
            });
    }

    logout() {
        this.af.auth.logout();
        this.router.navigate(['/']);
    }

}
