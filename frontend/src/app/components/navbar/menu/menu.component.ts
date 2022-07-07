import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/interfaces/menu/menu-item';
import { User } from 'src/app/interfaces/user';
import { Profile } from 'src/app/interfaces/user/profile';
import { HelperService } from 'src/app/services/helper.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  loggedIn: boolean = false;
  user: User;
  profile: Profile;
  url:string;
  items: MenuItem[] = [];

  constructor(
    private userService: UserService, 
    private router: Router,    
    private menuService: MenuService,
    private helperService:HelperService
    ) { 
    let _this = this;
    this.user = {
      id: 0,
      name: '',
      email:'',
      password: '',
      token:'',
      profile: {} as Profile
    }

    this.profile = {
      images : [],
      role: '',
      info: '',
      user_id: this.user.id
    }

   
    this.userService.subject.subscribe({
      next(res) {          
        _this.loggedIn = res;          
      }
    })
    this.url = '//localhost:80/api/';
    
  }

  ngOnInit(): void {
    let _this = this
    this.menuService.items$.subscribe({
      next(res) {
        _this.items = res
      }
    })
    console.log(this.items)
  }

  navigate(route:any) {
     
    return this.router.navigate([route]).then(() => {
      this.helperService.reloadCurrentRoute();
    });    
  }

  logout() {
    this.userService.logout();
  }
}

