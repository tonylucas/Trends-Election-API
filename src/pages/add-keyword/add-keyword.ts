import { Component } from '@angular/core';
import { KeywordsProvider } from '../../providers/keywords';
import { Router } from '@angular/router'
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Keyword } from '../../model/keyword';


@Component({
    selector: 'add-keyword',
    templateUrl: 'add-keyword.html'
})
export class AddKeyword {

    selectedKeyword: Object;
    googleGeoCode: string = "http://localhost:3000/google-autocomplete/:keyword";

    constructor(public keywordsProvider: KeywordsProvider, private router: Router) {
        this.selectedKeyword = {
            title: "",
            mid: "",
            type: ""
        };
    }


    autocompleteSelected(event): void {
        this.selectedKeyword = event;
        console.log(this.selectedKeyword);
    }

    formatAutocomplete(data: any): string {
        console.log(data);
        let html: string = "";
        html += data["title"] ? `<b>${data["title"]}</b>, ` : "";
        html += data["type"] ? `<span>${data["type"]}</span>` : data;
        return html;
    }

    save(): void {
        this.keywordsProvider.createKeyword(this.selectedKeyword).subscribe((res) => {
            this.router.navigate(['/keywords']);
        });

        // this.viewCtrl.dismiss(review);
    }

    close(): void {
        // this.viewCtrl.dismiss();
    }
}
