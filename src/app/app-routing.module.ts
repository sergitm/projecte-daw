import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IniciComponent } from './inici/inici.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  {path: '', component: IniciComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
