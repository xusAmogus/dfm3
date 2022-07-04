import { Component, OnInit } from '@angular/core';
import { Writeup } from 'src/app/interfaces/writeup';
import { WriteupService } from 'src/app/services/writeup.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  id: number = 0
  writeup: Writeup = { id: 0, title:'', subTitle: '', content: '', link:''}
  constructor(
    private writeupService: WriteupService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    let _this = this
    this.route.params.subscribe({
      next(params){
        _this.id = +params['id']
      }
    }) 
    this.writeupService.show(this.id).subscribe({
      next(res){
        _this.writeup = res;
      }
    })
  }

}
