import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Espai } from 'src/app/model/espai.model';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-nou-espai',
  templateUrl: './nou-espai.component.html',
  styleUrls: ['./nou-espai.component.css']
})
export class NouEspaiComponent implements OnInit {

  protected form!: FormGroup;
  protected errorMessage: any;
  protected successMessage: any;
  protected disabled!: any;

  constructor(private dataService: DataService, private formBuilder: FormBuilder){
    
  }

  ngOnInit(): void {
    this.form = this.createForm();
  }

  public get nom(){
    return this.form.get('nom');
  }

  public createForm(){
    return this.formBuilder.group( {
        nom: [null,[
          Validators.required
        ]]
      }
    );
  }

  public afegirEspai(){
    if (this.form.valid) {
      let values = this.form.value;
      let persona = new Espai(values['nom']);
      
      this.dataService.createEspai(persona).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          this.successMessage = resposta.message;
          this.errorMessage = '';
        } else {
          this.errorMessage = resposta.message;
          this.successMessage = '';
        }
        
      }, error : (err) => {
        this.errorMessage = (err.message);
        this.successMessage = '';
      }});
      
    } else {
      this.errorMessage = "El formulari no és vàlid.";
      this.successMessage = '';
    }
  }
}
