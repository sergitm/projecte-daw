import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dispositiu } from 'src/app/model/dispositiu.model';
import { Espai } from 'src/app/model/espai.model';
import { Persona } from 'src/app/model/persona.model';
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

  getClasses(){
    const url = `${this.baseUrl}${this.apiUrl.classes}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'getClasses',
      session_id: session.session_id
    });
  }

  createPersona(persona: Persona){
    const url = `${this.baseUrl}${this.apiUrl.crearPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'createPersona',
      session_id: session.session_id,
      persona: persona
    });
  }

  createEspai(espai: Espai){
    const url = `${this.baseUrl}${this.apiUrl.crearEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'createEspai',
      session_id: session.session_id,
      espai: espai
    });
  }

  readEspais(pagina: number, numPerPagina: number){
    const url = `${this.baseUrl}${this.apiUrl.readEspais}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readEspais',
      session_id: session.session_id,
      espais: numPerPagina,
      pagina: pagina
    });
  }

  readAllEspais(){
    const url = `${this.baseUrl}${this.apiUrl.readEspais}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readEspais',
      session_id: session.session_id,
      espais: 'all'
    });    
  }

  buscarEspais(data:string, pagina: number, numPerPagina: number){
    const url = `${this.baseUrl}${this.apiUrl.buscarEspais}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'buscarEspais',
      session_id: session.session_id,
      espais: data,
      pagina: pagina,
      qtEspais: numPerPagina
    });
  }

  numeroPaginesEspai(numPerPagina : number, criteri : string){
    
    const url = `${this.baseUrl}${this.apiUrl.numPaginesEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'numPagines',
      session_id: session.session_id,
      numPerPagina : numPerPagina,
      criteri : criteri
    });
  }

  createDispositiu(dispositiu: Dispositiu){
    const url = `${this.baseUrl}${this.apiUrl.crearDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'createDispositiu',
      session_id: session.session_id,
      dispositiu: dispositiu
    });
  }

  readDispositius(pagina: number, numPerPagina: number){
    const url = `${this.baseUrl}${this.apiUrl.readDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readDispositius',
      session_id: session.session_id,
      dispositius: numPerPagina,
      pagina: pagina
    });
  }

  readAllDispositius(){
    const url = `${this.baseUrl}${this.apiUrl.readDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readDispositius',
      session_id: session.session_id,
      dispositius: 'all'
    });
  }

  readAllPersones(){
    const url = `${this.baseUrl}${this.apiUrl.readPersones}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readPersones',
      session_id: session.session_id,
      persones: 'all'
    });
  }

  buscarDispositius(data:string, pagina: number, numPerPagina: number){
    const url = `${this.baseUrl}${this.apiUrl.buscarDispositius}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'buscarDispositius',
      session_id: session.session_id,
      dispositiu: data,
      pagina: pagina,
      qtDispositius: numPerPagina
    });
  }

  numeroPaginesDispositiu(numPerPagina : number, criteri : string){
    
    const url = `${this.baseUrl}${this.apiUrl.numPaginesDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'numPagines',
      session_id: session.session_id,
      numPerPagina : numPerPagina,
      criteri : criteri
    });
  }

  infoTipusDispositiu(){
    const url = `${this.baseUrl}${this.apiUrl.infoSelects}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'infoTipus',
      session_id: session.session_id
    });
  }

  infoEstatDispositiu(){
    const url = `${this.baseUrl}${this.apiUrl.infoSelects}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'infoEstats',
      session_id: session.session_id
    });
  }

  getPersona(id : string){
    
    const url = `${this.baseUrl}${this.apiUrl.getPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'getPersona',
      session_id: session.session_id,
      persona_id: id
    });
  }

  updatePersona(persona: Persona | undefined){
    const url = `${this.baseUrl}${this.apiUrl.updatePersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'update',
      session_id: session.session_id,
      persona: persona
    });
  }

  deletePersona(persona: Persona | undefined){
    const url = `${this.baseUrl}${this.apiUrl.deletePersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'delete',
      session_id: session.session_id,
      persona: persona
    });
  }

  getEspai(id : string){
    
    const url = `${this.baseUrl}${this.apiUrl.getEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'getEspai',
      session_id: session.session_id,
      espai_id: id
    });
  }

  updateEspai(espai: Espai | undefined){
    const url = `${this.baseUrl}${this.apiUrl.updateEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'update',
      session_id: session.session_id,
      espai: espai
    });
  }

  deleteEspai(espai: Espai | undefined){
    const url = `${this.baseUrl}${this.apiUrl.deleteEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'delete',
      session_id: session.session_id,
      espai: espai
    });
  }

  getDispositiu(id : string){
    
    const url = `${this.baseUrl}${this.apiUrl.getDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'getDispositiu',
      session_id: session.session_id,
      dispositiu_id: id
    });
  }

  updateDispositiu(dispositiu: Dispositiu | undefined){
    const url = `${this.baseUrl}${this.apiUrl.updateDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'update',
      session_id: session.session_id,
      dispositiu: dispositiu
    });
  }

  deleteDispositiu(dispositiu: Dispositiu | undefined){
    const url = `${this.baseUrl}${this.apiUrl.deleteDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'delete',
      session_id: session.session_id,
      dispositiu: dispositiu
    });
  }

  // Funcions per gestionar les relacions de PERSONES

  addEspaiPersona(persona_id: number, espai_id: number){
    const url = `${this.baseUrl}${this.apiUrl.addEspaiPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addEspai',
      session_id: session.session_id,
      persona: persona_id,
      espai: espai_id
    });
  }

  addDispositiuPersona(persona_id: number, dispositiu_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.addPersonaDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addDispositiu',
      session_id: session.session_id,
      dispositiu: dispositiu_id,
      persona: persona_id
    });
  }

  readEspaiPersona(persona_id: number){
    const url = `${this.baseUrl}${this.apiUrl.readEspaisPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readEspais',
      session_id: session.session_id,
      persona: persona_id
    });
  }

  readDispositiuPersona(persona_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.readDispositiusPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readDispositius',
      session_id: session.session_id,
      persona: persona_id
    });
  }

  deleteEspaiPersona(persona_id: number, espai_id: number){
    const url = `${this.baseUrl}${this.apiUrl.deleteEspaiPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'deleteEspai',
      session_id: session.session_id,
      persona: persona_id,
      espai: espai_id
    });
  }

  deleteDispositiuPersona(persona_id: number, dispositiu_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.deletePersonaDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'deleteDispositiu',
      session_id: session.session_id,
      dispositiu: dispositiu_id,
      persona: persona_id
    });
  }

  // FUNCIONS HTTP PER GESTIONAR LES RELACIONS DE ESPAIS

  addPersonaEspai(persona_id: number, espai_id: number){
    const url = `${this.baseUrl}${this.apiUrl.addPersonaEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addPersona',
      session_id: session.session_id,
      persona: persona_id,
      espai: espai_id
    });
  }

  addDispositiuEspai(espai_id: number, dispositiu_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.addDispositiuEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addDispositiu',
      session_id: session.session_id,
      dispositiu: dispositiu_id,
      espai: espai_id
    });
  }

  readPersonesEspai(espai_id: number){
    const url = `${this.baseUrl}${this.apiUrl.readPersonesEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readPersones',
      session_id: session.session_id,
      espai: espai_id
    });
  }

  readDispositiusEspai(espai_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.readDispositiusEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readDispositius',
      session_id: session.session_id,
      espai: espai_id
    });
  }

  deletePersonaEspai(persona_id: number, espai_id: number){
    const url = `${this.baseUrl}${this.apiUrl.deletePersonaEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'deletePersona',
      session_id: session.session_id,
      persona: persona_id,
      espai: espai_id
    });
  }

  deleteDispositiuEspai(espai_id: number, dispositiu_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.deleteDispositiuEspai}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'deleteDispositiu',
      session_id: session.session_id,
      dispositiu: dispositiu_id,
      espai: espai_id
    });
  }

  // FUNCIONS HTTP PER GESTIONAR LES RELACIONS DE DISPOSITIUS

  addDispositiusPersona(persona_id: number, dispositiu_id: number){
    const url = `${this.baseUrl}${this.apiUrl.addDispositiuPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addPersona',
      session_id: session.session_id,
      persona: persona_id,
      dispositiu: dispositiu_id
    });
  }

  addEspaiDispositiu(espai_id: number, dispositiu_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.addEspaiDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'addEspai',
      session_id: session.session_id,
      dispositiu: dispositiu_id,
      espai: espai_id
    });
  }

  readEspaisDispositiu(dispositiu_id: number){
    const url = `${this.baseUrl}${this.apiUrl.readEspaisDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readEspais',
      session_id: session.session_id,
      dispositiu: dispositiu_id
    });
  }

  readPersonesDispositiu(dispositiu_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.readPersonesDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'readPersones',
      session_id: session.session_id,
      dispositiu: dispositiu_id
    });
  }

  deletePersonaDispositiu(persona_id: number, dispositiu_id: number){
    const url = `${this.baseUrl}${this.apiUrl.deleteDispositiuPersona}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'deletePersona',
      session_id: session.session_id,
      persona: persona_id,
      dispositiu: dispositiu_id
    });
  }

  deleteEspaiDispositiu(espai: number, dispositiu_id: number){
    
    const url = `${this.baseUrl}${this.apiUrl.deleteEspaiDispositiu}`;

    const sessionCache = localStorage.getItem('session');
    const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;

    return this.http.post(url, {
      accio: 'deleteEspai',
      session_id: session.session_id,
      dispositiu: dispositiu_id,
      espai: espai
    });
  }
}
