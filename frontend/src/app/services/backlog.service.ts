import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';    
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Backlog } from '../interfaces/backlog';
import { FormBuilder } from '@angular/forms';
import { Countable } from '../interfaces/dashboard/countable';    
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {
    
  private apiURL = "//localhost:80/api";
  public token = 'Bearer ' + sessionStorage.getItem('token');  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : this.token
    })
  }
   
  constructor(
    private httpClient: HttpClient,
    private helperService: HelperService
    ) { }
    
  index(): Observable<Backlog[]> {
    return this.httpClient.get<Backlog[]>(this.apiURL + '/backlogs/', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  create(backlog: FormBuilder): Observable<Backlog> {
    return this.httpClient.post<Backlog>(this.apiURL + '/backlogs/', JSON.stringify(backlog), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
     
  edit(backlog:Backlog): Observable<Backlog> {
    backlog.origin = 'edit';    
    return this.httpClient.put<Backlog>(this.apiURL + '/backlogs/' + backlog.id, JSON.stringify(backlog), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  delete(backlog:Backlog){
    return this.httpClient.delete<Backlog>(this.apiURL + '/backlogs/' + backlog.id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  complete(backlog:Backlog):Observable<Backlog> {
    backlog.origin ='complete';
    return this.httpClient.patch<Backlog>(this.apiURL + '/backlogs/' + backlog.id, JSON.stringify(backlog), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  completed(interval: string):Observable<Countable> {
    return this.httpClient.get<Countable>(this.apiURL + '/backlogs/completed/' + interval, this.httpOptions )
    .pipe(
      catchError(this.helperService.errorHandler)
    );
  }
     
   
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}