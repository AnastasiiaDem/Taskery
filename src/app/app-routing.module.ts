import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardComponent} from './board/board.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './shared/services/auth.guard';

const routes: Routes = [
    {path: '', component: BoardComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
