import { Component, OnInit } from '@angular/core';
import { AddKeyword} from '../add-keyword/add-keyword';
import { KeywordsProvider } from '../../providers/keywords';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {

    keywords: any;

    constructor() {

    }

    ionViewDidLoad(){
        // this.keywordsProvider.getKeywords().then((data) => {
        //     this.keywords = data;
        //     console.log(this.keywords);
        // });
    }

    addKeyword(){
        // console.log("add keyword");
        // let modal = this.modalCtrl.create(AddKeyword);
        //
        // modal.onDidDismiss(keyword => {
        //     if (keyword) {
        //         this.keywords.push(keyword);
        //         this.keywordsProvider.createKeyword(keyword);
        //     }
        // });
        //
        // modal.present();
    }

    deleteKeyword(keyword){
        //Remove locally
        // let index = this.keywords.indexOf(keyword);
        //
        // if (index > -1) {
        //     this.keywords.splice(index, 1);
        // }
        //
        //Remove from database
        // this.keywordsProvider.deleteKeyword(keyword._id);
    }

}
