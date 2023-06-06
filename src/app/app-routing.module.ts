import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IniciComponent } from './inici/inici.component';
import { authGuard } from './guard/auth.guard';
import { SessionComponent } from './session/session.component';
import { ImportacioComponent } from './administracio/importacio/importacio.component';
import { AdministracioComponent } from './administracio/administracio.component';
import { UsuarisComponent } from './administracio/usuaris/usuaris.component';

const routes: Routes = [
  {path: '', component: IniciComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'session', component: SessionComponent},
  {path: 'admin', component: AdministracioComponent},
  {path: 'admin/importacio', component: ImportacioComponent},
  {path: 'admin/usuaris', component: UsuarisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
