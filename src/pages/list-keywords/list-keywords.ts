import { Component, OnInit } from '@angular/core';
import { KeywordsProvider } from '../../providers/keywords';
import { TrendsProvider } from '../../providers/trends';
import {Router} from '@angular/router'


@Component({
    selector: 'list-keywords',
    templateUrl: 'list-keywords.html'
})
export class ListKeywords implements OnInit {

    keywords: any;

    constructor(
        public keywordsProvider: KeywordsProvider,
        public trendsProvider: TrendsProvider,
        private router: Router) {

    }

    close(): void {
        // this.viewCtrl.dismiss();
    }

    delete(id): void {
        this.keywordsProvider.deleteKeyword(id).subscribe((res) => {
            console.log(res);
            this.router.navigate(['/keywords']);
        });
        // this.router.navigate(['/keywords']);
    }

    updateKeywords(id): void {
        this.keywords.forEach((keyword) => {
            // console.log(keyword);
            this.trendsProvider
                .getTrend(keyword.name)
                .subscribe((res) => {
                    console.log(res);
                });
        });

        // this.router.navigate(['/keywords']);
    }

    ngOnInit() {
        this.keywordsProvider.getKeywords().then((data) => {
            // console.log(data);
            this.keywords = data
        });
    }
}
