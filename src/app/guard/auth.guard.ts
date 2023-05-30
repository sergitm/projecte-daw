import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "src/services/login.service";

export const authGuard : CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    const user = loginService.isLogged().subscribe({ next : response => {
        interface resposta {logged : Boolean, user: any};
        let logged = response as resposta;
        console.log(response);
        if (logged.logged) {
            router.navigate(['/']);
        }else{
            router.navigate(['/login']);
        }
      }, error : (err) => {
        console.error(err.message);
      }});

    return true;
  
};