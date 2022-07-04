import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import  { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/user/profile';
import { HttpService } from './http.service';
import { HelperService } from './helper.service';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public profile!: Profile;
  private user : User = { id: 0, name: 'Enter your name', email: 'Enter your email', password:'Enter your password', token:'', profile: this.profile };
  public subject = new BehaviorSubject<any>(null);
 
  constructor(
    private httpClient: HttpClient, 
    private httpService: HttpService, 
    private helperService: HelperService,
    private menuService: MenuService
   ) { 
    
  }

  setUser(user:User) {
    this.user = user;
  }

  getUser(){
    return this.user;
  }
  logoutEvent(data:any){
    //next just sets a new value on the subject
    this.subject.next(data);    
  }
  createProfile(data: FormData): Observable<any>{    
    
    return this.httpClient.post(this.httpService.url + 'profiles', data, this.httpService.httpOptions);
  }
  updateProfile(id: number, data: FormData): Observable<any>{    
    // data.forEach((key,value) => console.log(key,value)); Debugger for formdata
    // use method spoofing in form data _method='put' as work around for header accept/content issues
    return this.httpClient.post(this.httpService.url + 'profiles/'+id, data , this.httpService.httpOptions);
  }

  profileExists(id:number) {
    
    return this.httpClient.get(this.httpService.url + 'profiles/profileExists/'+id, this.httpService.httpOptions);
  }
  
  getUserWithProfile(id:number) {
    return this.httpClient.get<User>(`${this.httpService.url}profiles/${id}`, this.httpService.httpOptions);
  }

   
  registerUser(user: User)  {
    return this.httpClient.post(this.httpService.url+'auth/register', user, {});
  }
  loginUser(user: User) {    
    return this.httpClient.post(this.httpService.url+'auth/login', user, {});
  }
  getCookie(){
    return this.httpClient.get(this.httpService.cookieUrl+'sanctum/csrf-cookie');
  }
  logout() {
    let _this = this;
    
    this.httpService.setOptions('Application/json', this.user.token)
    return this.httpClient.post(this.httpService.url+ 'auth/logout',JSON.stringify(_this.user), this.httpService.getOptions()).subscribe({
      next() {
        sessionStorage.setItem('token', '');
        localStorage.setItem('X-XSRF-TOKEN','');        
        _this.helperService.redirectToPage('/');
        _this.menuService.clear();
        _this.menuService.setItems([
          { path: '', name: 'home', icon: 'home'},
          { path: 'register', name: 'Register', icon: 'create'},
          { path: 'login', name: 'Sign In', icon: 'create'},
        ])
        _this.user.token = ''
      }
    });
    
  }
 
  
}
