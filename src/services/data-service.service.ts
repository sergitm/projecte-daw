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

  deleteUser(user: string){
    const url = `${this.baseUrl}${this.apiUrl.deleteUsers}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'deleteUser',
      session_id: session.session_id,
      user: user,
    });
  }

  readPersones(pagina: number, numPerPagina: number){
    const url = `${this.baseUrl}${this.apiUrl.readPersones}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readPersones',
      session_id: session.session_id,
      persones: numPerPagina,
      pagina: pagina
    });
  }

  buscarPersones(data:string, pagina: number, numPerPagina: number){
    const url = `${this.baseUrl}${this.apiUrl.buscarPersones}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'buscarPersones',
      session_id: session.session_id,
      persones: data,
      pagina: pagina,
      qtPersones: numPerPagina
    });
  }

  numeroPagines(numPerPagina : number, criteri : string){
    
    const url = `${this.baseUrl}${this.apiUrl.numPagines}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'numPagines',
      session_id: session.session_id,
      numPerPagina : numPerPagina,
      criteri : criteri
    });
  }
}
