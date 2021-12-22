import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TaskService} from './shared/services/task.service';
import {UserService} from './shared/services/user.service';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ErrorInterceptor} from './shared/services/error.interceptor';
import {ToastrModule} from 'ngx-toastr';
import {TaskListComponent} from './board/task-list/task-list.component';
import {BoardComponent} from './board/board.component';
import {AddTaskComponent} from './board/add-task/add-task.component';
import {AuthenticationService} from './shared/services/authentication.service';
import {AlertService} from './shared/services/alert.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        TaskListComponent,
        BoardComponent,
        AddTaskComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        DragDropModule
    ],
    providers: [HttpClientModule, TaskService, UserService, AlertService, AuthenticationService,
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
