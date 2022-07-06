import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBacklogDialogComponent } from '../../dialogs/create-backlog-dialog/create-backlog-dialog.component';

@Component({
  selector: 'app-backlog-create',
  templateUrl: './backlog-create.component.html',
  styleUrls: ['./backlog-create.component.scss']
})
export class BacklogCreateComponent implements OnInit {

  constructor(private dialog: MatDialog, private router: Router, private route : ActivatedRoute ) { }

  ngOnInit(): void {
    let dialogRef = this.dialog.open(CreateBacklogDialogComponent,{});
    dialogRef.afterClosed().subscribe(_ => this.router.navigate(['dashboard/backlog']));
  }

}
