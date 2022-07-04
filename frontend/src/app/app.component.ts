import { Component, OnInit } from '@angular/core';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  
  constructor(
    public menuService: MenuService
  ){}

  ngOnInit(): void {    
    this.menuService.setItems([
      { path:'register',name:'register', icon:'create' },
      { path:'login', name:'login', icon:'create'}
    ]);
  }

  ngOnDestroy(): void {
    this.menuService.clear();
  }
}
