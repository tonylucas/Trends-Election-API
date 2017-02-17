import { Component } from '@angular/core';
import { TrendsProvider } from '../../providers/trends';
import {Router} from '@angular/router'


@Component({
    selector: 'add-trend',
    templateUrl: 'add-trend.html'
})
export class AddTrend {

    name: any;
    values: any;
    type: any;

    constructor(public trendsProvider: TrendsProvider, private router: Router) {

    }

    save(): void {
        let trend = {
            name: this.name,
            values: "",
            type: "",
        };

        this.trendsProvider.createTrend(trend);
        this.router.navigate(['/trends']);

        // this.viewCtrl.dismiss(review);
    }

    close(): void {
        // this.viewCtrl.dismiss();
    }
}
