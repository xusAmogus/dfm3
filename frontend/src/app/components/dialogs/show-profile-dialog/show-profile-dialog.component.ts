import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-profile-dialog',
  templateUrl: './show-profile-dialog.component.html',
  styleUrls: ['./show-profile-dialog.component.scss']
})
export class ShowProfileDialogComponent implements OnInit {
  
  @Output() userChangeEvent : EventEmitter<User> = new EventEmitter<User>();
  public token = 'Bearer ' + sessionStorage.getItem('token');  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : this.token
    })
  }  
  profileForm = this.fb.group({
    info: [''],
    role: [''],
    image: [''],
    imageSource: [''],
    user_id: [this.userService.getUser().id]
  })
  

  constructor(
    private userService:UserService, 
    private fb: FormBuilder, 
    private httpClient: HttpClient,    
    private dialogRef: MatDialogRef<ShowProfileDialogComponent>
    ) { }

  ngOnInit(): void {
    //get userprofile from api
    this.getUserProfile().subscribe({
      next(res) {
       
      }
    });
  }
  getUserProfile() {
    let _this = this;
    return this.httpClient.get('//localhost:80/api/me',_this.httpOptions );
  }

  onSubmit() {
    let _this = this;
    const formData = new FormData();
    formData.append('role', this.profileForm.controls['role'].value);
    formData.append('info', this.profileForm.controls['info'].value);
    formData.append('user_id',this.profileForm.controls['user_id'].value);
    formData.append('image', this.profileForm.controls['image'].value);
    
    const id = this.userService.getUser().id;
    this.userService.profileExists(id).subscribe({
      next(res){        
        if(res === true) {
          formData.append('_method', 'PUT');        
          _this.userService.updateProfile(id, formData).subscribe({
            next() {
              _this.userService.getUserWithProfile(id).subscribe({
                next(user: User) {
                  _this.userChange(user);
                }
              });              
            }
          })
        } else {
          _this.userService.createProfile(formData).subscribe({
            next() {
              _this.userService.getUserWithProfile(id).subscribe({
                next(user: User) {
                  _this.userChange(user);
                }
              });
            }
          })
        }
        _this.dialogRef.close();
      }
    })
  }

  addFileToForm(event:any) {
      const file = (event.target as HTMLInputElement)?.files?.[0];      
      this.profileForm.patchValue({'image': file});        
  }

  userChange(value: any) {
    this.userChangeEvent.emit(value);
  }
    
}
