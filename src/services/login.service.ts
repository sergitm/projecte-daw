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

  isLogged(session_id: string){
    const url = `${this.baseUrl}${this.apiUrl.login}`;
    
    return this.http.post(url, {accio:"logged", session_id:session_id});  
  }

  logout(session_id: string){
    const url = `${this.baseUrl}${this.apiUrl.logout}`;
    
    return this.http.post(url, {accio:"logout", session_id:session_id}); 
  }
}
