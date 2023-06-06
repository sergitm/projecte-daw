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
}
