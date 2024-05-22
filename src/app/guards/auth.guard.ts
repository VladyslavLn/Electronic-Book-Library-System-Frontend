import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";
import {AuthService} from "../service/auth.service";

@Injectable()
export class CanActivateRoute {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.currentAuthStatus.pipe(
      switchMap((isAuthenticated) => {
        const isLoginPath = route.routeConfig?.path?.includes('login') || route.routeConfig?.path.includes('register');
        if (isAuthenticated && isLoginPath) {
          this.router.navigate(['home']);
        } else if (!isAuthenticated && !isLoginPath) {
          this.router.navigate(['login']);
        }
        return of(isLoginPath || isAuthenticated);
      })
    );
  }
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  return inject(CanActivateRoute).canActivate(route);
};
