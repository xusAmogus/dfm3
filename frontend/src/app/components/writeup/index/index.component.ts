import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Writeup } from 'src/app/interfaces/writeup';
import { MenuService } from 'src/app/services/menu.service';
import { WriteupService } from 'src/app/services/writeup.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  
  list: Writeup[] = [];
    
  constructor(
    private router:Router, 
    private menuService: MenuService,
    private writeupService: WriteupService
    ) { }

  ngOnInit(): void {
    let _this = this;
    this.writeupService.index().subscribe({
      next(res) {
        _this.list = res
      }
    })
    this.router.navigate(['dashboard/writeup/index']);
    this.menuService.setItems([{ path:'dashboard/writeup/create', name:'create', icon:'create'}]); 
  }

  showWriteUp(id:number) {
    this.router.navigate(['dashboard/writeup/show/', id])
  }
}
