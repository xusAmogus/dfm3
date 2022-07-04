import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  
  userService:any;
  token:any;

  constructor(userService: UserService){
    this.userService = userService;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if(sessionStorage.getItem('token') === this.userService.getUser().token && this.userService.getUser().token !== ''){
      return true;
    }
    return false;
  }
  
}
