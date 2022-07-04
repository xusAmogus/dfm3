import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Profile } from 'src/app/interfaces/user/profile';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  submitted = false;
  public profile!: Profile;
  public user : User = { id:0, name: 'Enter your name', email: 'Enter your email', password:'Enter your password', token:'', profile:this.profile };
  public msg: string = '';
  public hide: boolean = true;
  public classes: Array<String> = [];
 
  constructor(
    private httpService: HttpService, 
    private userService: UserService,
    private menuService: MenuService, 
    private router: Router
    ) { 
    this.router = router;
    this.userService = userService;
  }

  ngOnInit(): void {
    this.menuService.setItems([
      { path:'/', name:'home', icon:'home'}
    ])
  }

  validate(formValues: FormGroup){
    
  }


  onSubmit() {
    this.submitted = true;
    this.login(this.user);
  }

  login(user: User){
    this.userService.getCookie().subscribe((res:any) => {
      
      this.userService.loginUser(user).subscribe( (res: any) => {
        
        if(res.status=== "Success"){
          this.user = res.data.user;
          this.user.token = res.data.token;
          sessionStorage.setItem('token', res.data.token);
          let cookieArr = document.cookie.split('=');
          localStorage.setItem('X-XSRF-TOKEN',cookieArr[1]);
          this.userService.setUser(this.user);
          this.userService.logoutEvent('true');
          this.router.navigate(['/dashboard']);       
        }
      });
    })
    
  }

}

