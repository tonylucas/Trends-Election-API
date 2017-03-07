import { Component } from '@angular/core';
import { KeywordsProvider } from '../../providers/keywords';
import { Router } from '@angular/router'
import { AngularFire } from 'angularfire2';

@Component({
    selector: 'login',
    templateUrl: 'login.html'
})
export class Login {
    email: string;
    password: string;

    constructor(public af: AngularFire, private router: Router) {

    }

    login() {
        this.af.auth.login({ email: this.email, password: this.password }).then((data) => {
            this.router.navigate(['/']);
        });
    }
}
