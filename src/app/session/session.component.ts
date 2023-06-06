import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { Session } from '../interfaces/session';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  parametro!: string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    // Recollim la session_id generada pel backend de la URL
    this.route.queryParams.subscribe(params => {
      this.parametro = params['session_id'];

      // Preguntem al servidor si la session_id existeix (si está logat)
      this.loginService.isLogged(this.parametro).subscribe(response => {
        let resposta = response as {
          logged: boolean;
          user: Session;
        };

        // Si está logat, guardem les dades de la sessió a la caché del client
        if (resposta.logged) {
          localStorage.setItem('session', JSON.stringify(resposta.user));
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
      });
    });
  }
}
