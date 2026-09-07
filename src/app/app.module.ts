import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';
import { AddKeyword } from '../pages/add-keyword/add-keyword';
import { Login } from '../pages/login/login';
import { ListKeywords } from '../pages/list-keywords/list-keywords';
import { KeywordsProvider } from '../providers/keywords';
import { TrendsProvider } from '../providers/trends';
import { MatchsProvider } from '../providers/matchs';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { environment } from '../environments/environment';


const myFirebaseConfig = environment.firebase;

const myFirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
};

const appRoutes: Routes = [
    {
        path: '',
        component: ListKeywords
    }, {
        path: 'login',
        component: Login
    }, {
        path: 'keywords/add',
        component: AddKeyword
    }, {
        path: '**',
        redirectTo: ''
    }
];


@NgModule({
    declarations: [
        AppComponent,
        AddKeyword,
        ListKeywords,
        Login
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig),
        Ng2AutoCompleteModule
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
export class AppModule {

}
