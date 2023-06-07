import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { Session } from '../interfaces/session';

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
) => {

  
  const sessionCache = localStorage.getItem('session');
  const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;
  
  if (session != null) {
    if (session.admin === "1") {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
