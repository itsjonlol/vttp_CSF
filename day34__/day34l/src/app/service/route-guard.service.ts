import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanDeactivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AppService } from './app.service';
import { DebounceComponent } from '../components/debounce/debounce.component';
import { FormComponent } from '../components/form/form.component';

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


export const canProceedToForms: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // boolean Promise<boolea>, Observable<boolean>
  // UrlTree Promise<UrlTree> Observable<UrlTree>
  const appSvc = inject(AppService)
  const router = inject(Router)

  if (!appSvc.checked)
    return router.parseUrl('/employeelist') // Redirect if false

  return true // Allow access if true
}

// export const canProceedToForms: CanActivateFn = () => {
//   const http = inject(HttpClient);
//   const router = inject(Router);

//   return http.get<{ authorized: boolean }>('http://localhost:8080/api/auth/verify')
//     .pipe(
//       map(response => response.authorized), // ✅ Allow if `true`
//       catchError(() => of(router.parseUrl('/login'))) // ❌ Redirect if API fails
//     );
// };

// CanDeactivateFn<FormComponent>
export const canLeaveForm: CanDeactivateFn<any> = (form: FormComponent,
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

  // boolean Promise<boolea>, Observable<boolean>
  // UrlTree Promise<UrlTree> Observable<UrlTree>
  if (!form.prestine)
    return confirm('Form data is not saved.\nAre you sure you want to leave?')

  return true
}