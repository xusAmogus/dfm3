import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Countable } from 'src/app/interfaces/dashboard/countable';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-count',
  templateUrl: './item-count.component.html',
  styleUrls: ['./item-count.component.scss']
})
export class ItemCountComponent implements OnInit {
  @Input() imgUrl: string = '';
  intervals = ['daily','weekly','monthly','yearly'];
  selected = this.intervals[0];
  @Input() countable : Countable = { count: 0, interval: ''};
  @Output() setIntervalEvent = new EventEmitter<Countable>();
  @Input() userImageUrl: string = ''
  constructor() { }

  ngOnInit(): void {
    
    
  }
  
  getItemsPerInterval(event:any){
    this.countable.interval = event;
  }

  setInterval(value:any){
    this.setIntervalEvent.emit(value)
  }
}
