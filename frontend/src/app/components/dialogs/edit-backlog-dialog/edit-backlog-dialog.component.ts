import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Backlog } from 'src/app/interfaces/backlog';
import { BacklogService } from 'src/app/services/backlog.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-edit-backlog-dialog',
  templateUrl: './edit-backlog-dialog.component.html',
  styleUrls: ['./edit-backlog-dialog.component.scss']
})
export class EditBacklogDialogComponent implements OnInit {
  backlogForm = this.fb.group({
    id: [''],
    title: [''],
    category: [''],    
    priority: [''],
    description: [''],
    completed: [this.data.backlog.completed]
  });

  categories= ['frontend','backend','devops'];
  priorities = [...Array(10).keys()];
  constructor(
    public dialogRef: MatDialogRef<EditBacklogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { backlog:Backlog },
    private fb: FormBuilder, 
    private backlogService : BacklogService, 
    private helper:HelperService
    ) { }

  ngOnInit(): void {
    this.backlogForm.patchValue(this.data.backlog);    
  }
  submit(){
    let _this = this;
    this.backlogService.edit(this.backlogForm.value).subscribe({
      next(res){ 
        _this.dialogRef.close();        
        _this.helper.reloadCurrentRoute();        
      },
      error(res) { }
    });
    
  }
}
