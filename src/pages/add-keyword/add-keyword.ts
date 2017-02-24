import { Component } from '@angular/core';
import { KeywordsProvider } from '../../providers/keywords';
import {Router} from '@angular/router'


@Component({
    selector: 'add-keyword',
    templateUrl: 'add-keyword.html'
})
export class AddKeyword {

    name: any;
    values: any;
    type: any;

    constructor(public keywordsProvider: KeywordsProvider, private router: Router) {

    }

    save(): void {
        let keyword = {
            name: this.name,
            values: "",
            type: "",
        };

        this.keywordsProvider.createKeyword(keyword).subscribe((res) => {
            this.router.navigate(['/keywords']);
        });

        // this.viewCtrl.dismiss(review);
    }

    close(): void {
        // this.viewCtrl.dismiss();
    }
}
