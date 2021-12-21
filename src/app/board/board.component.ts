import {Component} from '@angular/core';
import {UserModel} from '../shared/models/user.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent {
    currentUser: UserModel;

    constructor(private router: Router,
                private authenticationService: AuthenticationService) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
