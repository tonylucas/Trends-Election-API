import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { Home } from '../pages/home/home';
import { AddKeyword } from '../pages/add-keyword/add-keyword';
import { ListKeywords } from '../pages/list-keywords/list-keywords';
import { KeywordsProvider } from '../providers/keywords';
import { TrendsProvider } from '../providers/trends';

const appRoutes: Routes = [
    // {
    //     path: 'keyword/:id',
    //     component: KeywordDetailComponent
    // },
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
        TrendsProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
