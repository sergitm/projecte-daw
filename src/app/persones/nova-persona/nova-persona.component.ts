import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Persona } from 'src/app/model/persona.model';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-nova-persona',
  templateUrl: './nova-persona.component.html',
  styleUrls: ['./nova-persona.component.css']
})
export class NovaPersonaComponent implements OnInit{

  protected form!: FormGroup;
  protected classes!: any;
  protected etapes: string[] = [];
  protected cursos: string[] = [];
  protected grups: string[] = [];
  protected cursData: any[] = [];
  protected errorMessage: any;
  protected successMessage: any;
  protected disabled!: any;

  constructor(private dataService: DataService, private formBuilder: FormBuilder){
    
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.dataService.getClasses().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.classes = resposta.data;
        resposta.data.etapes.forEach((element: any) => {
          this.etapes.push(Object.keys(element)[0]);
        });
      }
    });
  }

  public get nom_cognoms(){
    return this.form.get('nom_cognoms');
  }
  public get usuari(){
    return this.form.get('usuari');
  }
  public get etapa(){
    return this.form.get('etapa');
  }
  public get curs(){
    return this.form.get('curs');
  }
  public get grup(){
    return this.form.get('grup');
  }

  public createForm(){
    return this.formBuilder.group( {
        nom_cognoms: [null,[
          Validators.required
        ]],
        usuari: [null,[
          Validators.required
        ]],
        etapa: [null,[]],
        curs: [null,[]],
        grup: [null,[]]
      }
    );
  }

  public setCursos(event: any){
    this.cursos = [];
    this.classes.etapes.forEach((element: any) => {
      let etapa = Object.keys(element)[0];
      if (etapa === event.target.value){
        this.cursData = Object.values(element)[0] as any[];
        this.cursData.forEach((curs: any) => {
          this.cursos.push(Object.keys(curs)[0]);
        });
      }
    });    
  }

  public setGrups(event: any){
    this.grups = [];
    this.cursData.forEach((element: any) => {
      let aux = Object.keys(element)[0];
      if (aux === event.target.value){
        let aux2 = Object.values(element)[0] as any[];
        this.grups = aux2;
        this.disabled = (this.grups.length === 0) ? true : null;
      }
    });
    
  }

  public afegirPersona(){
    if (this.form.valid) {
      let values = this.form.value;
      let persona = new Persona(values['nom_cognoms'], values['usuari'], values['etapa'], values['curs'], values['grup']);
      
      this.dataService.createPersona(persona).subscribe({ next : response => {
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
