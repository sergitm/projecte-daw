import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseUrl;
    this.apiUrl = environment.apiUrl;
  }

  private baseUrl;
  private apiUrl;

  isLogged(){
    const url = `${this.baseUrl}${this.apiUrl.login}`;
    
    return this.http.post(url, {accio:"logged"});  
  }
}
