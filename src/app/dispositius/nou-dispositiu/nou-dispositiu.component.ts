import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Dispositiu } from 'src/app/model/dispositiu.model';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-nou-dispositiu',
  templateUrl: './nou-dispositiu.component.html',
  styleUrls: ['./nou-dispositiu.component.css']
})
export class NouDispositiuComponent {

  protected form!: FormGroup;
  protected errorMessage: any;
  protected successMessage: any;
  protected disabled!: any;
  protected arrTipus: string[] = [];
  protected arrEstat: string[] = [];

  constructor(private dataService: DataService, private formBuilder: FormBuilder){
    
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.populateSelectTipus();
    this.populateSelectEstat();
  }

  public get nom(){
    return this.form.get('nom');
  }
  public get tipus(){
    return this.form.get('tipus');
  }
  public get estat(){
    return this.form.get('estat');
  }

  public createForm(){
    return this.formBuilder.group( {
        nom: [null,[
          Validators.required
        ]],
        tipus: [null,[
          Validators.required
        ]],
        estat: [null,[
          Validators.required
        ]]
      }
    );
  }

  public populateSelectTipus(){
    this.dataService.infoTipusDispositiu().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.arrTipus = resposta.data.tipus;
      }
    });
  }

  public populateSelectEstat(){
    this.dataService.infoEstatDispositiu().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.arrEstat = resposta.data.estat;
      }
    });
  }

  public afegirDispositiu(){
    if (this.form.valid) {
      let values = this.form.value;
      let dispositiu = new Dispositiu(values['nom'], values['tipus'], values['estat']);
      
      this.dataService.createDispositiu(dispositiu).subscribe({ next : response => {
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
