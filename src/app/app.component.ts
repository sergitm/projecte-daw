import { Component, OnInit } from '@angular/core';
import { Session } from './interfaces/session';
import { LoginService } from 'src/services/login.service';
import { ResponseMessage } from './interfaces/response-message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Projecte DAW';

  logged = false;
  user : any = null;

  constructor(private login: LoginService, private router: Router){
    const sessionCache = localStorage.getItem('session');
    if (sessionCache != null) {
      this.logged = true;
      this.user = JSON.parse(sessionCache) as Session;
    }
  }
  
  ngOnInit(): void {
    
  }

  logout(){
    this.login.logout(this.user.session_id).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        localStorage.clear();
        window.location.reload();
      }
    });
  }

}
