﻿import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {AlertService} from '../../shared/services/alert.service';
import {Subject, takeUntil} from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  private readonly unsubscribe: Subject<void> = new Subject();
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
  
  get f() {
    return this.loginForm.controls;
  }
  
  onSubmit() {
    this.submitted = true;
    
    this.alertService.clear();
    
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(
        takeUntil(this.unsubscribe),
        first()
      )
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
