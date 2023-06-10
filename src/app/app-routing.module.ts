import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IniciComponent } from './inici/inici.component';
import { authGuard } from './guard/auth.guard';
import { SessionComponent } from './session/session.component';
import { AdministracioComponent } from './administracio/administracio.component';
import { adminGuard } from './guard/admin.guard';
import { DispositiusComponent } from './dispositius/dispositius.component';
import { PersonesComponent } from './persones/persones.component';
import { EspaisComponent } from './espais/espais.component';

const routes: Routes = [
  {path: '', component: IniciComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'session', component: SessionComponent},
  {path: 'admin', component: AdministracioComponent, canActivate: [authGuard, adminGuard]},
  {path: 'dispositius', component: DispositiusComponent, canActivate: [authGuard]},
  {path: 'persones', component: PersonesComponent, canActivate: [authGuard]},
  {path: 'espais', component: EspaisComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
