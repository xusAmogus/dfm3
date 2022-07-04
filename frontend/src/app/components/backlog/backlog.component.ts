import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Backlog } from 'src/app/interfaces/backlog';
import  { BacklogService } from 'src/app/services/backlog.service';
import { MatDialog } from '@angular/material/dialog';
import {  MatSort } from '@angular/material/sort';
import  { MatTableDataSource } from '@angular/material/table';
import { EditBacklogDialogComponent } from '../dialogs/edit-backlog-dialog/edit-backlog-dialog.component';
import { DeleteBacklogDialogComponent } from '../dialogs/delete-backlog-dialog/delete-backlog-dialog.component';
import { MenuService } from 'src/app/services/menu.service';


@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {
  
  dataSource = new MatTableDataSource<Backlog>();
  displayedColumns: string[] = ['id','title', 'category', 'priority','action','completed'];
  
  @ViewChild(MatSort, { static: true }) sort! : MatSort;
  @Output() backlogChangedEvent =  new EventEmitter<Backlog>()
  constructor(
    public backlogService: BacklogService, 
    public dialog: MatDialog,
    private menuService: MenuService 
    ) { 
    
  }

  ngOnInit(): void {
    this.menuService.setItems([
      { path:'dashboard/backlog/index', name:'show all', icon:'list'},
      { path:'dashboard/backlog/create', name:'create', icon:'create'}
    ]);
    this.backlogService.index().subscribe((data: Backlog[])=>{
       
       this.dataSource.data  = data;
         
    })
    this.dataSource.sort = this.sort
  }

  edit(backlog:Backlog){
    
    this.dialog.open(EditBacklogDialogComponent,{
      width:'66%',
      height: '66%',
      data: { backlog: backlog }      
    })
  }

  delete(backlog:Backlog){
    this.dialog.open(DeleteBacklogDialogComponent,{
      height: '25%',
      width: '35%',
      data: { backlog: backlog }
    })
  }

  complete(element: Backlog, event: any) {
    element.completed = event.checked;
    this.backlogService.complete(element).subscribe({
      next(){},
      error(){}
    })
  }

  backlogChanged(value: Backlog) {
    this.backlogChangedEvent.emit(value);
    console.log(this.backlogChangedEvent.emit(value));
  }
}
