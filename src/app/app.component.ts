import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router'


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public static API_ENDPOINT = environment.apiEndpoint;
    
    constructor(public af: AngularFire, private router: Router) {
        this.af.auth.subscribe(auth => {
            if(!auth) {
                this.router.navigate(['/login']);
            }
        });

    }
}
