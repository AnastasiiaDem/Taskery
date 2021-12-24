import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {UserService} from '../../shared/services/user.service';
import {AlertService} from '../../shared/services/alert.service';
import {UserModel} from 'src/app/shared/models/user.model';
import {PositionEnum} from '../../shared/enums';
import {Select2OptionData} from 'ng-select2';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    userList: UserModel[] = [];
    positionData: Array<Select2OptionData> = [];

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private authenticationService: AuthenticationService,
                private userService: UserService,
                private alertService: AlertService) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.positionData = [
            {id: PositionEnum.programmer, text: PositionEnum.programmer},
            {id: PositionEnum.designer, text: PositionEnum.designer},
            {id: PositionEnum.teamLead, text: PositionEnum.teamLead}
        ];
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            position: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            agree: ['', Validators.required]
        });
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.registerForm.invalid) {
            return;
        }

        this.userService.getUsers().subscribe(users => {
            this.userList = users;
        });

        let userObject: UserModel = {
            id: this.userList.length ? Math.max(...this.userList.map(x => x.id)) + 1 : 1,
            email: this.registerForm.value.email,
            firstName: this.registerForm.value.firstName,
            lastName: this.registerForm.value.lastName,
            password: this.registerForm.value.password,
            position: this.registerForm.value.position
        };

        this.loading = true;
        this.userService.addUser(userObject)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
