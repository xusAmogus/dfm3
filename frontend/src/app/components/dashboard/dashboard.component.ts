import { Component, OnInit, OnDestroy } from '@angular/core';
import { Backlog } from 'src/app/interfaces/backlog';
import { BacklogService } from 'src/app/services/backlog.service';
import { MenuService } from 'src/app/services/menu.service';
import  { Countable } from '../../interfaces/dashboard/countable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  countable:Countable = { count:0, interval:'daily' };
  
  constructor( 
    private menuService: MenuService, 
    private backlogService: BacklogService) { 
    
  }

  ngOnInit(): void {
    let _this = this;
    
    this.menuService.setItems([
      { path:'dashboard/backlog', name:'backlog', icon:'dashboard'},
      { path:'dashboard/writeup', name:'writeup', icon:'create'}
    ]);
    
    this.backlogService.completed(this.countable.interval).subscribe({
      next(res){
        _this.countable  = res;        
      }
    });
  }
  
  updateCompletedItemsCount(event:Backlog) {
    let _this = this;
    this.backlogService.completed(this.countable.interval).subscribe({
      next(res){
        _this.countable  = res;             
      }
    });
  }
  setInterval($event:any) {
    let _this = this;
    this.backlogService.completed($event.value).subscribe({
      next(res){
        _this.countable  = res;             
      }
    });
  }
  ngOnDestroy(): void {
    this.menuService.clear();
  }
}
