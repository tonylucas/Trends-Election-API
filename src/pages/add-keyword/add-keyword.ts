import { Component } from '@angular/core';
import { KeywordsProvider } from '../../providers/keywords';
import { Router } from '@angular/router'
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Keyword } from '../../model/keyword';
import { AppComponent } from '../../app/app.component';


@Component({
    selector: 'add-keyword',
    templateUrl: 'add-keyword.html'
})
export class AddKeyword {

    public selectedKeyword: Keyword;
    public twitterName: string;
    public googleGeoCode: string = AppComponent.API_ENDPOINT + 'google-autocomplete/:keyword';

    constructor(public keywordsProvider: KeywordsProvider, private router: Router) {
        this.selectedKeyword = new Keyword();
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
        this.keywordsProvider.createKeyword({
            keyword: this.selectedKeyword,
            twitterName: this.twitterName
        }).subscribe((res) => {
            this.router.navigate(['/keywords']);
        });

        // this.viewCtrl.dismiss(review);
    }

    close(): void {
        // this.viewCtrl.dismiss();
    }
}
