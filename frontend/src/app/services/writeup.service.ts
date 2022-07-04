import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import { Writeup } from '../interfaces/writeup';
import { HelperService } from './helper.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WriteupService {

  constructor(
    private httpClient: HttpClient,
    private http: HttpService,
    private helperService: HelperService
    ) { }
  
  index() {
    return this.httpClient.get<Writeup[]>(this.http.apiUrl + 'writeups', this.http.httpOptions)
    .pipe(
      catchError(this.helperService.errorHandler)
    )
  }
  show(id:number) {

    return this.httpClient.get<Writeup>(this.http.apiUrl + 'writeups/'+ id, this.http.httpOptions).pipe(
      catchError(this.helperService.errorHandler)
    )
  }
  create(writeup: FormBuilder): Observable<Writeup> {
    return this.httpClient.post<Writeup>(this.http.apiUrl + 'writeups/', JSON.stringify(writeup), this.http.httpOptions)
    .pipe(
      catchError(this.helperService.errorHandler)
    )
  }
}
