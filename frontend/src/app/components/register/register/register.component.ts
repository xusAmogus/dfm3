import { Component, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { User } from 'src/app/interfaces/user';
import { HelperService } from 'src/app/services/helper.service';
import { Profile } from 'src/app/interfaces/user/profile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  
  submitted = false;
  public profile!: Profile;
  public user : User = { id: 0, name: 'Enter your name', email: 'Enter your email', password:'Enter your password', token:'', profile: this.profile};
  public msg: string = '';
  public hide: boolean = true;
  public classes: Array<String> = [];

  constructor(
    private httpService: HttpService, 
    private helper: HelperService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
  }

  validate(formValues: FormGroup){
    if(formValues.value.name.length > 100){
      this.hide = false;
      this.msg = "Thats a long name bro";
      this.classes.push('error');
      
    } else {
      this.classes.pop();
    }
  }


  onSubmit() {
    this.submitted = true;
    this.register(this.user);
  }

  register(user: User){
    let _this = this;
    this.userService.registerUser(user).subscribe({
      next() {
        _this.helper.redirectToPage('login');
      },
      error() {}
    })
  }
}
