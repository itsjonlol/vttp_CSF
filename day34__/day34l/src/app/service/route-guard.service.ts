import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate{

  router = inject(Router)

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // alert('You are not allowed to access this page as it is undergoing developmenet');
    // this.router.navigate(['']);

    //by right put false
    return true;
  }
}
