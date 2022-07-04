import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { CreateBacklogDialogComponent } from '../dialogs/create-backlog-dialog/create-backlog-dialog.component';
import { UserService } from 'src/app/services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from '../../services/helper.service';
import  { User } from '../../interfaces/user';
import { Profile } from 'src/app/interfaces/user/profile';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  routeParams:string = '';
  profile!: Profile;
  user: User = {id: 0, name:'',email:'', password:'', token:'', profile: this.profile };
  public loggedIn: any = null;

  constructor(
    public dialog:MatDialog, 
    private userService: UserService,
    private route: ActivatedRoute  
    ) {
      let _this = this;
      this.userService.subject.subscribe({
        next(res) {          
          _this.loggedIn = res;          
        }
      })
    }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.routeParams = params['name'];
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateBacklogDialogComponent, {
      width: '66%',
    });
  }

  logout() {
    this.userService.logout();
  }

  
}
