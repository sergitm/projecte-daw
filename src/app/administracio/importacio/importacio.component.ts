import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { DataService } from 'src/services/data-service.service';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ResponseMessage } from 'src/app/interfaces/response-message';

@Component({
  selector: 'app-importacio',
  templateUrl: './importacio.component.html',
  styleUrls: ['./importacio.component.css']
})
export class ImportacioComponent {

  // PROPIETATS
  protected file!: any;
  protected dades: string = '';
  protected fileName!: string;
  protected requiredFileType : string = 'tsv';
  protected success : boolean = false;
  protected error!: any;
  protected message : any;
  protected uploadProgress!: number | null;
  protected uploadSub!: Subscription | null;
  protected uploadSuccess!: boolean;
  faUpload = faUpload;

  // CONSTRUCTOR
  constructor(private dataService: DataService){

  }

  // METODES
  public getFile(event:any){
    this.error = null;
    this.uploadSub = null;
    this.uploadSuccess = false;
    this.uploadProgress = null;
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.comprovarFitxer(this.file);
    event.target.value = null;
  }

  public pujarFitxer(){
    if (this.file && !this.error) {
      const formData = new FormData();
      formData.append('dades_alumnes', this.file);
      formData.append('accio', 'import');

      const sessionCache = localStorage.getItem('session');
      const session = (sessionCache != null) ? JSON.parse(sessionCache) : null;
      formData.append('session_id', session.session_id);

      const upload = this.dataService.import(formData).pipe(
        finalize(() => {
          this.uploadSuccess = true;
          this.reset();
        })
      );

      this.uploadSub = upload.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress && event?.loaded && event?.total) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));          
        } else if (event.type == HttpEventType.Response){
          let response = event.body as ResponseMessage;
          this.success = response.success;
          this.message = response.message;
        }
      })
    }
  }

  public cancela(){
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  public reset(){
    this.file = null;
    this.fileName = '';
    this.uploadSub = null;
    this.error = null;
  }

  public comprovarFitxer(file:any){
    let split = file.name.split('.');
    if (split[split.length - 1] === this.requiredFileType) {
      this.success = true;
      this.error = '';
    } else {
      this.error = 'L\'extensió del fitxer no és vàlida.';
    }
    
  }

  public onFileDropped(fitxer:any){
    this.error = null;
    this.uploadSub = null;
    this.uploadSuccess = false;
    this.uploadProgress = null;
    this.file = fitxer;
    this.fileName = this.file.name;
    this.comprovarFitxer(this.file);
  }
}
