import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  public url = '//localhost:80/api/';
  public apiUrl = '//localhost:80/api/';
  public cookieUrl = '//localhost:80/';

  constructor(
    private http: HttpClient,    
    private helperService: HelperService
    ) { }

  public token = 'Bearer ' + sessionStorage.getItem('token');  
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : this.token
    })
  }
  setOptions(contentType: string, token:string){
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': contentType,
        'Authorization': `Bearer ${token}`
      })
    }
  }

  getOptions() {
    return this.httpOptions;
  }
}
