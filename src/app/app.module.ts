import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { Home } from '../pages/home/home';
import { AddTrend } from '../pages/add-trend/add-trend';
import { ListTrends } from '../pages/list-trends/list-trends';
import { TrendsProvider } from '../providers/trends';

const appRoutes: Routes = [
    // {
    //     path: 'trend/:id',
    //     component: TrendDetailComponent
    // },
    {
        path: 'trends',
        component: ListTrends
    }, {
        path: 'trends/add',
        component: AddTrend
    }, {
        path: '',
        redirectTo: '/trends',
        pathMatch: 'full'
    },
    // {
    //     // path: '**', component: PageNotFoundComponent
    // }
];


@NgModule({
    declarations: [
        AppComponent,
        AddTrend,
        ListTrends
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    entryComponents: [
        AppComponent,
        AddTrend,
        ListTrends
    ],
    providers: [
        TrendsProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
