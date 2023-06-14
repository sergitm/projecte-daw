import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faLock, faLockOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Espai } from 'src/app/model/espai.model';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-gestio-espai',
  templateUrl: './gestio-espai.component.html',
  styleUrls: ['./gestio-espai.component.css']
})
export class GestioEspaiComponent implements OnInit {

  protected form!: FormGroup;
  protected espai! : Espai | undefined;
  protected disabledForm : boolean = true;
  protected disabled!: any;
  protected errorMessage: any;
  protected successMessage: any;
  protected eliminarShow: boolean = false;
  protected newPersona!: string;
  protected newDispositiu!: string;
  protected persones: any[] = [];
  protected dispositius: any[] = [];
  protected addPersonaMessage: any;
  protected addPersonaError: any;
  protected addDispositiuMessage: any;
  protected addDispositiuError: any;
  protected personesList: any[] = [];
  protected dispositiusList: any[] = [];
  faLock = faLock;
  faTrash = faTrash;

  constructor(private dataService:DataService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.dataService.getEspai(this.route.snapshot.params['id']).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.espai = new Espai(resposta.data.nom, resposta.data.id);
        this.loadTaules();
      }
    });

    this.dataService.readAllPersones().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.persones = resposta.data;
      }
    });

    this.dataService.readAllDispositius().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.dispositius = resposta.data;
      }
    });
  }

  public get nom(){
    return this.form.get('nom');
  }

  public createForm(){
    return this.formBuilder.group( {
        nom: [null,[]]
      }
    );
  }

  public enableForm(){
    this.disabledForm = !this.disabledForm;
    if (this.disabledForm) {
      this.faLock = faLock;
    } else {
      this.faLock = faLockOpen;
    }
    
  }

  public editarEspai(){
    if (!this.disabledForm) {
      let newEspai = this.espai;
      let values = this.form.value;
      newEspai!.setNom = values['nom'] ?? this.espai?.getNom;

      this.dataService.updateEspai(newEspai).subscribe({ next : response => {
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

  public eliminarEspai(){
    let del = prompt("Estàs segur de que vols eliminar aquest espai? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      this.dataService.deleteEspai(this.espai).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          this.router.navigate(['/espais']);
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
    this.dataService.readPersonesEspai(this.espai!.getId).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.personesList = resposta.data;             
      }
    });

    this.dataService.readDispositiusEspai(this.espai!.getId).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.dispositiusList = resposta.data;
      }
    });
  }

  public afegirPersona(){
    let persona = this.persones.filter(element => element.usuari === this.newPersona);
    console.log(persona);
    
    this.dataService.addPersonaEspai(persona[0].id, this.espai!.getId).subscribe({ next : response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.addPersonaMessage = resposta.message;
        this.addPersonaError = '';
        this.loadTaules();
      } else {
        this.addPersonaError = resposta.message;
        this.addPersonaMessage = '';
      }
      
    }, error : (err) => {
      this.addPersonaError = (err.message);
      this.addPersonaMessage = '';
    }});
    
  }

  public afegirDispositiu(){
    let dispositiu = this.dispositius.filter(element => element.nom === this.newDispositiu);
    
    this.dataService.addDispositiuEspai(this.espai!.getId, dispositiu[0].id).subscribe({ next : response => {
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

  public esborrarPersona(persona_id: number){
    let del = prompt("Estàs segur de que vols eliminar aquesta persona? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      
      this.dataService.deletePersonaEspai(persona_id, this.espai!.getId).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          window.location.reload();
        } else {
          this.addPersonaError = resposta.message;
          this.addPersonaMessage = '';
        }
        
      }, error : (err) => {
        this.addPersonaError = (err.message);
        this.addPersonaMessage = '';
      }});
    }
  }

  public esborrarDispositiu(dispositiu_id: number){
    let del = prompt("Estàs segur de que vols eliminar aquest dispositiu? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      
      this.dataService.deleteDispositiuEspai(this.espai!.getId, dispositiu_id).subscribe({ next : response => {
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
