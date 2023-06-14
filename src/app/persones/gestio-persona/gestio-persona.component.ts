import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Persona } from 'src/app/model/persona.model';
import { DataService } from 'src/services/data-service.service';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-gestio-persona',
  templateUrl: './gestio-persona.component.html',
  styleUrls: ['./gestio-persona.component.css']
})
export class GestioPersonaComponent implements OnInit {

  protected form!: FormGroup;
  protected persona! : Persona | undefined;
  protected disabledForm : boolean = true;
  protected disabled!: any;
  protected classes!: any;
  protected etapes: any[] = [];
  protected cursos: any[] = [];
  protected grups: any[] = [];
  protected cursData: any[] = [];
  protected errorMessage: any;
  protected successMessage: any;
  protected eliminarShow: boolean = false;
  protected newEspai!: string;
  protected newDispositiu!: string;
  protected espais: any[] = [];
  protected dispositius: any[] = [];
  protected addEspaiMessage: any;
  protected addEspaiError: any;
  protected addDispositiuMessage: any;
  protected addDispositiuError: any;
  protected espaisList: any[] = [];
  protected dispositiusList: any[] = [];
  faLock = faLock;
  faTrash = faTrash;

  constructor(private dataService:DataService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.dataService.getPersona(this.route.snapshot.params['id']).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.persona = new Persona(resposta.data.nom_cognoms, resposta.data.usuari, resposta.data.etapa, resposta.data.curs, resposta.data.grup, resposta.data.id);
        this.etapes = [this.persona.getEtapa];
        this.cursos = [this.persona.getCurs];
        this.grups = [this.persona.getGrup];
        this.etapa?.setValue(this.persona?.getEtapa);
        this.curs?.setValue(this.persona?.getCurs);
        this.grup?.setValue(this.persona?.getGrup);

        
        this.loadTaules();
      }
    });

    this.dataService.getClasses().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.classes = resposta.data;
      }
    });

    
    this.dataService.readAllEspais().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.espais = resposta.data;
      }
    });

    this.dataService.readAllDispositius().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.dispositius = resposta.data;
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
        nom_cognoms: [null,[]],
        usuari: [null,[]],
        etapa: [null,[]],
        curs: [null,[]],
        grup: [null,[]]
      }
    );
  }

  public enableForm(){
    this.disabledForm = !this.disabledForm;
    if (this.disabledForm) {
      this.faLock = faLock;
      this.etapes = [this.persona?.getEtapa];
      this.cursos = [this.persona?.getCurs];
      this.grups = [this.persona?.getGrup];
      this.etapa?.setValue(this.persona?.getEtapa);
      this.curs?.setValue(this.persona?.getCurs);
      this.grup?.setValue(this.persona?.getGrup);
    } else {
      this.faLock = faLockOpen;
      this.classes.etapes.forEach((element: any) => {
        this.etapes.push(Object.keys(element)[0]);
        if (Object.keys(element)[0] === this.persona?.getEtapa) {
          this.etapa?.setValue(Object.keys(element)[0]);
        }
      });
    }
    
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

  public editarPersona(){
    if (!this.disabledForm) {
      let newPersona = this.persona;
      let values = this.form.value;
      newPersona!.setNomCognoms = values['nom_cognoms'] ?? this.persona?.getNomCognoms;
      newPersona!.setUsuari = values['usuari'] ?? this.persona?.getUsuari;
      newPersona!.setEtapa = values['etapa'];
      newPersona!.setCurs = values['curs'];
      newPersona!.setGrup = values['grup'];
      newPersona!.setId = this.persona!.getId;

      this.dataService.updatePersona(newPersona).subscribe({ next : response => {
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
    }
  }

  public showEliminar(){
    this.eliminarShow = !this.eliminarShow;
  }

  public eliminarPersona(){
    let del = prompt("Estàs segur de que vols eliminar aquesta persona? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      this.dataService.deletePersona(this.persona).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          this.router.navigate(['/persones']);
        } else {
          this.errorMessage = resposta.message;
          this.successMessage = '';
        }
        
      }, error : (err) => {
        this.errorMessage = (err.message);
        this.successMessage = '';
      }});
    }
  }

  public loadTaules(){
    this.dataService.readEspaiPersona(this.persona!.getId).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.espaisList = resposta.data;             
      }
    });

    this.dataService.readDispositiuPersona(this.persona!.getId).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.dispositiusList = resposta.data;
      }
    });
  }

  public afegirEspai(){
    let espai = this.espais.filter(element => element.nom === this.newEspai);
    
    this.dataService.addEspaiPersona(this.persona!.getId, espai[0].id).subscribe({ next : response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.addEspaiMessage = resposta.message;
        this.addEspaiError = '';
        this.loadTaules();
      } else {
        this.addEspaiError = resposta.message;
        this.addEspaiMessage = '';
      }
      
    }, error : (err) => {
      this.addEspaiError = (err.message);
      this.addEspaiMessage = '';
    }});
    
  }

  public afegirDispositiu(){
    let dispositiu = this.dispositius.filter(element => element.nom === this.newDispositiu);
    
    this.dataService.addDispositiuPersona(this.persona!.getId, dispositiu[0].id).subscribe({ next : response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.addDispositiuMessage = resposta.message;
        this.addDispositiuError = '';
        this.loadTaules();
      } else {
        this.addDispositiuError = resposta.message;
        this.addDispositiuMessage = '';
      }
      
    }, error : (err) => {
      this.addDispositiuError = (err.message);
      this.addDispositiuMessage = '';
    }});
  }

  public esborrarEspai(espai_id: number){
    let del = prompt("Estàs segur de que vols eliminar aquest espai? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      
      this.dataService.deleteEspaiPersona(this.persona!.getId, espai_id).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          window.location.reload();
        } else {
          this.addEspaiError = resposta.message;
          this.addEspaiMessage = '';
        }
        
      }, error : (err) => {
        this.addEspaiError = (err.message);
        this.addEspaiMessage = '';
      }});
    }
  }

  public esborrarDispositiu(dispositiu_id: number){
    let del = prompt("Estàs segur de que vols eliminar aquest dispositiu? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      
      this.dataService.deleteDispositiuPersona(this.persona!.getId, dispositiu_id).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          window.location.reload();
        } else {
          this.addDispositiuError = resposta.message;
          this.addDispositiuMessage = '';
        }
        
      }, error : (err) => {
        this.addDispositiuError = (err.message);
        this.addDispositiuMessage = '';
      }});
    }
  }
}
