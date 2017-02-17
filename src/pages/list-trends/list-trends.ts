import { Component, OnInit } from '@angular/core';
import { TrendsProvider } from '../../providers/trends';
import {Router} from '@angular/router'


@Component({
    selector: 'list-trends',
    templateUrl: 'list-trends.html'
})
export class ListTrends implements OnInit {

    trends: any;

    constructor(public trendsProvider: TrendsProvider, private router: Router) {

    }

    close(): void {
        // this.viewCtrl.dismiss();
    }

    delete(id): void {
        this.trendsProvider.deleteTrend(id);
        // this.router.navigate(['/trends']);
    }

    ngOnInit() {
        this.trendsProvider.getTrends().then((data) => {
            console.log(data);
            this.trends = data;
        });
    }
}
