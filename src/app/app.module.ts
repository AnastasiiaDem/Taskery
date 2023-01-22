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
import {BoardComponent} from './board/board.component';
import {AuthenticationService} from './shared/services/authentication.service';
import {AlertService} from './shared/services/alert.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {KanbanModule} from '@syncfusion/ej2-angular-kanban';
import {NgSelect2Module} from 'ng-select2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {HomeComponent} from './home/home.component';
import {ProjectsComponent} from './projects/projects.component';
import {ProjectsService} from './shared/services/project.service';
import {ReportComponent} from './report/report.component';
import {NgChartsModule} from 'ng2-charts';
import {
  AccumulationAnnotationService,
  AccumulationChartModule, AccumulationDataLabelService,
  AccumulationLegendService,
  AccumulationTooltipService,
  PieSeriesService
} from '@syncfusion/ej2-angular-charts';
import {AccordionModule} from '@syncfusion/ej2-angular-navigations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BoardComponent,
    HomeComponent,
    ProjectsComponent,
    ReportComponent
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
    DragDropModule,
    KanbanModule,
    NgSelect2Module,
    NgbModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    NgChartsModule,
    AccumulationChartModule,
    AccordionModule
  ],
  providers: [HttpClientModule, TaskService, UserService, ProjectsService, AlertService, AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }, PieSeriesService, AccumulationLegendService, AccumulationTooltipService, AccumulationDataLabelService,
    AccumulationAnnotationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
