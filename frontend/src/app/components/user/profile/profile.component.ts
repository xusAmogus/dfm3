import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ShowProfileDialogComponent } from '../../dialogs/show-profile-dialog/show-profile-dialog.component';
import  { Profile } from '../../../interfaces/user/profile';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  imgUrl = '../../../assets/images/user-images/admin/admin.png';
  @Input() profile!: Profile;
  public user!: User;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit(): void {
    let _this = this;
    let id = this.userService.getUser().id;
    this.userService.profileExists(id).subscribe({
      next(res) {
        if(res) {
          _this.userService.getUserWithProfile(id).subscribe({
            next(res) {
              _this.user = res;
              _this.profile = _this.user.profile        
              let img =_this.profile.images[_this.profile.images.length -1];
              _this.imgUrl = img.path;
            }
          })
        } else {
           _this.imgUrl = '../../../assets/images/user-images/default.png';
        }       
    }})
    
    
  }
  
  showUserProfile() {   
    let _this = this; 
    let dialogRef = this.dialog.open(ShowProfileDialogComponent,{
      height: '90%',
      width: '50%',
    })
    dialogRef.afterOpened().subscribe({
      next(res) {
        dialogRef.componentInstance.userChangeEvent.subscribe({
          next(res:any){
            _this.user = res;
            _this.profile = _this.user.profile        
            let img =_this.profile.images[_this.profile.images.length -1];
            _this.imgUrl = img.path;
          }
        })        
      }
    })
  }
  
}
