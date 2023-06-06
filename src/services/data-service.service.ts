import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl;
    this.apiUrl = environment.apiUrl;
  }
   
  private baseUrl;
  private apiUrl;

  import(formData: FormData){
    const url = `${this.baseUrl}${this.apiUrl.import}`;

    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  getUsers(){
    const url = `${this.baseUrl}${this.apiUrl.users}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'users',
      session_id: session.session_id,
    });
  }
  
  addAdmin(newAdmin: string){
    const url = `${this.baseUrl}${this.apiUrl.addUsers}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addAdmin',
      session_id: session.session_id,
      newAdmin: newAdmin
    });
  }

  addUser(newUser: string){
    const url = `${this.baseUrl}${this.apiUrl.addUsers}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addUser',
      session_id: session.session_id,
      newUser: newUser
    });
  }
}
