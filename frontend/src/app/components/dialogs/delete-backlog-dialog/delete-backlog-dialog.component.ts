import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import  { Backlog } from '../../../interfaces/backlog';
import { BacklogService } from 'src/app/services/backlog.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-delete-backlog-dialog',
  templateUrl: './delete-backlog-dialog.component.html',
  styleUrls: ['./delete-backlog-dialog.component.scss']
})
export class DeleteBacklogDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteBacklogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { backlog:Backlog },
    private backlogService: BacklogService,
    private helper: HelperService
    ) { }

  ngOnInit(): void {
  }

  delete() {
    let _this = this;
    this.backlogService.delete(this.data.backlog).subscribe({
      next() {
        _this.dialogRef.close();        
        _this.helper.reloadCurrentRoute();
      },
      error() {

      }
    })
  }

  close() {
    this.dialogRef.close();
  }

}
