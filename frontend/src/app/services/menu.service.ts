import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { MenuItem } from '../interfaces/menu/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public items$ : Observable<MenuItem[]>;
  private itemsSubject: BehaviorSubject<MenuItem[]>;  
  private items: MenuItem[];

  
  constructor() { 
    this.itemsSubject = new BehaviorSubject<MenuItem[]>([]);
    this.items$ = this.itemsSubject.asObservable();
    this.items = [];
  }

  setItems(items:MenuItem[]) {
    this.itemsSubject.next(items)    
  }
  

 
    

  clear() {
    this.items = [];
  }

}
