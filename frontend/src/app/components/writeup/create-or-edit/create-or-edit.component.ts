import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { WriteupService } from 'src/app/services/writeup.service';


@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.scss']
})
export class CreateOrEditComponent implements OnInit {
  writeupform = this.fb.group({
    title: [''],
    subTitle:[''],
    content: [''],
    link: ['']
  })
  constructor(
    private fb:FormBuilder, 
    private helperService: HelperService,
    private writeupService: WriteupService,
    private router: Router
    ) {  }

  ngOnInit(): void {
  }

  submit() {
    let _this = this;    
    this.writeupService.create(this.writeupform.value).subscribe({
      next(res){           
        _this.router.navigate(['dashboard/writeup/index']);
      },
      error(res) { console.log(res)}
    });
  }

}
