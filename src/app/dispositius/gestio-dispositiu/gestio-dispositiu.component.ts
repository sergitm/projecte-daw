import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faLock, faLockOpen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ResponseMessage } from 'src/app/interfaces/response-message';
import { Dispositiu } from 'src/app/model/dispositiu.model';
import { DataService } from 'src/services/data-service.service';

@Component({
  selector: 'app-gestio-dispositiu',
  templateUrl: './gestio-dispositiu.component.html',
  styleUrls: ['./gestio-dispositiu.component.css']
})
export class GestioDispositiuComponent implements OnInit {

  protected form!: FormGroup;
  protected dispositiu! : Dispositiu | undefined;
  protected disabledForm : boolean = true;
  protected disabled!: any;
  protected arrTipus: any[] = [];
  protected arrEstat: any[] = [];
  protected selectTipus: string[] = [];
  protected selectEstat: string[] = [];
  protected errorMessage: any;
  protected successMessage: any;
  protected eliminarShow: boolean = false;
  protected newPersona!: string;
  protected newEspai!: string;
  protected persones: any[] = [];
  protected espais: any[] = [];
  protected addPersonaMessage: any;
  protected addPersonaError: any;
  protected addEspaiMessage: any;
  protected addEspaiError: any;
  protected personesList: any[] = [];
  protected espaisList: any[] = [];
  faLock = faLock;
  faTrash = faTrash;

  constructor(private dataService:DataService, private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router){

  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.dataService.getDispositiu(this.route.snapshot.params['id']).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.dispositiu = new Dispositiu(resposta.data.nom, resposta.data.tipus, resposta.data.estat, resposta.data.id);
        this.arrEstat = [resposta.data.estat];
        this.arrTipus = [resposta.data.tipus];
        this.tipus?.setValue(this.dispositiu?.getTipus);
        this.estat?.setValue(this.dispositiu?.getEstat);
        this.populateSelectEstat();
        this.populateSelectTipus();
        this.loadTaules();
      }
    });

    this.dataService.readAllPersones().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.persones = resposta.data;
      }
    });

    this.dataService.readAllEspais().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.espais = resposta.data;
      }
    });

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
        nom: [null,[]],
        tipus: [null,[]],
        estat: [null,[]]
      }
    );
  }

  public enableForm(){
    this.disabledForm = !this.disabledForm;
    if (this.disabledForm) {
      this.faLock = faLock;
      this.arrEstat = [this.dispositiu?.getEstat];
      this.arrTipus = [this.dispositiu?.getTipus];
      this.tipus?.setValue(this.dispositiu?.getTipus);
      this.estat?.setValue(this.dispositiu?.getEstat);
    } else {
      this.faLock = faLockOpen;
      this.arrEstat = this.selectEstat;
      this.arrTipus = this.selectTipus;
      this.tipus?.setValue(this.dispositiu?.getTipus);
      this.estat?.setValue(this.dispositiu?.getEstat);
    }
  }

  public populateSelectTipus(){
    this.dataService.infoTipusDispositiu().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.selectTipus = resposta.data.tipus;
      }
    });
  }

  public populateSelectEstat(){
    this.dataService.infoEstatDispositiu().subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.selectEstat = resposta.data.estat;
      }
    });
  }

  public editarDispositiu(){
    if (!this.disabledForm) {
      let newDispositiu = this.dispositiu;
      let values = this.form.value;
      newDispositiu!.setNom = values['nom'] ?? this.dispositiu?.getNom;
      newDispositiu!.setTipus = values['tipus'] ?? this.dispositiu?.getTipus;
      newDispositiu!.setEstat = values['estat'] ?? this.dispositiu?.getEstat;
      newDispositiu!.setId = this.dispositiu!.getId;

      this.dataService.updateDispositiu(newDispositiu).subscribe({ next : response => {
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

  public eliminarDispositiu(){
    let del = prompt("Estàs segur de que vols eliminar aquest dispositiu? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      this.dataService.deleteDispositiu(this.dispositiu).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          this.router.navigate(['/dispositius']);
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
    this.dataService.readPersonesDispositiu(this.dispositiu!.getId).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.personesList = resposta.data;
        console.log(resposta.data);
      }
    });

    this.dataService.readEspaisDispositiu(this.dispositiu!.getId).subscribe(response => {
      let resposta = response as ResponseMessage;
      if (resposta.success) {
        this.espaisList = resposta.data;
      }
    });
  }

  public afegirPersona(){
    let persona = this.persones.filter(element => element.usuari === this.newPersona);
    console.log(persona);
    
    this.dataService.addDispositiusPersona(persona[0].id, this.dispositiu!.getId).subscribe({ next : response => {
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

  public afegirEspai(){
    let espai = this.espais.filter(element => element.nom === this.newEspai);
    
    this.dataService.addEspaiDispositiu(espai[0].id, this.dispositiu!.getId).subscribe({ next : response => {
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

  public esborrarPersona(persona_id: number){
    let del = prompt("Estàs segur de que vols eliminar aquesta persona? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      
      this.dataService.deletePersonaDispositiu(persona_id, this.dispositiu!.getId).subscribe({ next : response => {
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

  public esborrarEspai(espai_id: number){
    let del = prompt("Estàs segur de que vols eliminar aquest espai? Si n'estàs segur, escriu en majúscules: ESBORRAR");

    if(del === "ESBORRAR"){
      
      this.dataService.deleteEspaiDispositiu(espai_id, this.dispositiu!.getId,).subscribe({ next : response => {
        let resposta = response as ResponseMessage;
        if (resposta.success) {
          alert(resposta.message);
          window.location.reload();
        } else {
          this.addEspaiMessage = resposta.message;
          this.addEspaiError = '';
        }
        
      }, error : (err) => {
        this.addEspaiError = (err.message);
        this.addEspaiMessage = '';
      }});
    }
  }
}
