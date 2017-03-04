import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AddKeyword } from '../pages/add-keyword/add-keyword';
import { ListKeywords } from '../pages/list-keywords/list-keywords';
import { KeywordsProvider } from '../providers/keywords';
import { TrendsProvider } from '../providers/trends';
import { MatchsProvider } from '../providers/matchs';

const appRoutes: Routes = [
    {
        path: 'keywords',
        component: ListKeywords
    }, {
        path: 'keywords/add',
        component: AddKeyword
    }, {
        path: '',
        redirectTo: '/keywords',
        pathMatch: 'full'
    },
    // {
    //     // path: '**', component: PageNotFoundComponent
    // }
];


@NgModule({
    declarations: [
        AppComponent,
        AddKeyword,
        ListKeywords
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    entryComponents: [
        AppComponent,
        AddKeyword,
        ListKeywords
    ],
    providers: [
        KeywordsProvider,
        TrendsProvider,
        MatchsProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
