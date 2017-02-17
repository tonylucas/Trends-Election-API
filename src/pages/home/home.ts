import { Component, OnInit } from '@angular/core';
import { AddTrend} from '../add-trend/add-trend';
import { TrendsProvider } from '../../providers/trends';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {

    trends: any;

    constructor() {

    }

    ionViewDidLoad(){
        // this.trendsProvider.getTrends().then((data) => {
        //     this.trends = data;
        //     console.log(this.trends);
        // });
    }

    addTrend(){
        // console.log("add trend");
        // let modal = this.modalCtrl.create(AddTrend);
        //
        // modal.onDidDismiss(trend => {
        //     if (trend) {
        //         this.trends.push(trend);
        //         this.trendsProvider.createTrend(trend);
        //     }
        // });
        //
        // modal.present();
    }

    deleteTrend(trend){
        //Remove locally
        // let index = this.trends.indexOf(trend);
        //
        // if (index > -1) {
        //     this.trends.splice(index, 1);
        // }
        //
        //Remove from database
        // this.trendsProvider.deleteTrend(trend._id);
    }

}
