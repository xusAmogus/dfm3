import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Backlog } from 'src/app/interfaces/backlog';
import { BacklogService } from 'src/app/services/backlog.service';
import { HelperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-backlog-dialog',
  templateUrl: './create-backlog-dialog.component.html',
  styleUrls: ['./create-backlog-dialog.component.scss']
})
export class CreateBacklogDialogComponent implements OnInit {
  user: User = this.userService.getUser();
  backlogForm = this.fb.group({
    user_id: [this.user.id],
    title: [''],
    category: [''],    
    priority: [''],
    description: [''],
  });

  categories= ['frontend','backend','devops'];
  priorities = [...Array(10).keys()];
  constructor(public dialogRef: MatDialogRef<CreateBacklogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public backlog: Backlog,
    private fb: FormBuilder, 
    private backlogService : BacklogService, 
    private router: Router,
    private userService: UserService,
    private helperService: HelperService
    ) { }

  ngOnInit(): void {

  }
  submit(){
    let _this = this;    
    this.backlogService.create(this.backlogForm.value).subscribe({
      next(res){ 
        _this.dialogRef.close();        
        _this.router.navigate(['dashboard/backlog']).then(() => {
          _this.helperService.reloadCurrentRoute();
        });
      
      },
      error(res) { console.log(res)}
    });
    
  }
  
}
