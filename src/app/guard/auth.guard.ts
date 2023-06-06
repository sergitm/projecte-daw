import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "src/services/login.service";

export const authGuard : CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;
    if (session != null) {
        const user = loginService.isLogged(session.session_id).subscribe({ next : response => {
            interface resposta {logged : Boolean, user: any};
            let logged = response as resposta;
            if (logged.logged) {
                return true;
            }else{
                router.navigate(['/login']);
                return false;
            }
          }, error : (err) => {
            console.error(err.message);
          }});
    
        return true;
    } else {
        router.navigate(['/login']);
        return false;
    }
  
};