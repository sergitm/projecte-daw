import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IniciComponent } from './inici/inici.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SessionComponent } from './session/session.component';
import { ImportacioComponent } from './administracio/importacio/importacio.component';
import { UsuarisComponent } from './administracio/usuaris/usuaris.component';
import { AdministracioComponent } from './administracio/administracio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from 'src/services/data-service.service';
import { LoginService } from 'src/services/login.service';
import { DraganddropDirective } from './directives/draganddrop.directive';
import { DispositiusComponent } from './dispositius/dispositius.component';
import { PersonesComponent } from './persones/persones.component';
import { EspaisComponent } from './espais/espais.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IniciComponent,
    SessionComponent,
    ImportacioComponent,
    UsuarisComponent,
    AdministracioComponent,
    DraganddropDirective,
    DispositiusComponent,
    PersonesComponent,
    EspaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DataService,
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
